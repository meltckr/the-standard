#!/usr/bin/env node
import { createHash } from "node:crypto";
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { issues } from "../content/issues.js";

const DEFAULT_VOICE_ID = "Ib97zM6uFBc71OWgj75I";
const MODEL_ID = "eleven_multilingual_v2";
const root = fileURLToPath(new URL("../", import.meta.url));

function usage() {
  console.log("Usage: npm run audio:generate -- --issue 003");
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--help" || token === "-h") return { help: true };
    if (!token.startsWith("--") || !argv[index + 1]) throw new Error(`Invalid argument: ${token}`);
    args[token.slice(2)] = argv[index + 1];
    index += 1;
  }
  return args;
}

function projectPath(value) {
  const path = resolve(root, value.replace(/^\/+/, ""));
  if (!path.startsWith(root)) throw new Error(`Audio path escapes the project: ${value}`);
  return path;
}

function measureLoudness(inputPath, targetIntegratedLufs = -16, targetTruePeakDbtp = -1.5) {
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-nostats", "-i", inputPath,
    "-af", `loudnorm=I=${targetIntegratedLufs}:TP=${targetTruePeakDbtp}:LRA=11:print_format=json`,
    "-f", "null", "-"
  ], { encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Audio loudness analysis failed: ${result.stderr}`);

  const match = result.stderr.match(/\{\s*"input_i"[\s\S]*?"target_offset"\s*:\s*"[^"]+"\s*\}/);
  if (!match) throw new Error("Audio loudness analysis did not return readable measurements.");
  return JSON.parse(match[0]);
}

function renderNormalizedAudio(inputPath, outputPath, targetIntegratedLufs, targetTruePeakDbtp, audio) {
  const firstPass = measureLoudness(inputPath, targetIntegratedLufs, targetTruePeakDbtp);
  const loudnormFilter = [
    `loudnorm=I=${targetIntegratedLufs}:TP=${targetTruePeakDbtp}:LRA=11`,
    `measured_I=${firstPass.input_i}`,
    `measured_TP=${firstPass.input_tp}`,
    `measured_LRA=${firstPass.input_lra}`,
    `measured_thresh=${firstPass.input_thresh}`,
    `offset=${firstPass.target_offset}`,
    "linear=true",
    "print_format=summary"
  ].join(":");
  const result = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", inputPath,
    "-af", loudnormFilter, "-ar", "48000", "-ac", "1",
    "-codec:a", "libmp3lame", "-b:a", "96k",
    "-metadata", `title=${audio.title}`,
    "-metadata", "artist=Accelerated Velocity Consulting",
    "-metadata", "album=The Standard",
    outputPath
  ], { encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Audio finishing failed: ${result.stderr}`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  usage();
  process.exit(0);
}

const issue = args.issue
  ? issues.find((candidate) => candidate.number === args.issue || candidate.slug === args.issue)
  : [...issues].reverse().find((candidate) => candidate.audio);
if (!issue) throw new Error(`Issue not found: ${args.issue ?? "latest audio issue"}`);
if (!issue.audio) throw new Error(`Issue ${issue.number} has no audio configuration.`);

const { audio } = issue;
const narration = audio.transcript.join("\n\n").trim();
if (!narration) throw new Error(`Issue ${issue.number} has an empty audio transcript.`);
if (!narration.endsWith(audio.requiredClosing)) {
  throw new Error(`Narration must end exactly with: ${audio.requiredClosing}`);
}

const wordCount = narration.split(/\s+/).length;
if (wordCount < 500 || wordCount > 950) {
  throw new Error(`Narration is ${wordCount} words; The Standard audio contract is 500-950 words.`);
}

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) throw new Error("ELEVENLABS_API_KEY is required to generate narration.");

const outputPath = projectPath(audio.src);
const transcriptPath = projectPath(audio.transcriptFile);
const metadataPath = projectPath(audio.metadataFile);
const voiceId = process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_VOICE_ID;
const workDir = await mkdtemp(join(tmpdir(), "the-standard-elevenlabs-"));

try {
  await mkdir(dirname(outputPath), { recursive: true });
  await mkdir(dirname(transcriptPath), { recursive: true });
  await mkdir(dirname(metadataPath), { recursive: true });

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      text: narration,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.42,
        similarity_boost: 0.76,
        style: 0.12,
        use_speaker_boost: true,
        speed: 0.96
      }
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    let errorSummary = errorText.slice(0, 700);

    try {
      const errorPayload = JSON.parse(errorText);
      const detail = errorPayload?.detail;
      const status = detail?.status ?? errorPayload?.status ?? "unknown_error";
      const message = detail?.message ?? errorPayload?.message ?? "No error message returned.";
      errorSummary = `${status}: ${message}`;
    } catch {
      // Keep the bounded, plain-text response when the API does not return JSON.
    }

    throw new Error(
      `ElevenLabs generation failed with status ${response.status}: ${errorSummary}`,
    );
  }

  const rawPath = join(workDir, "raw.mp3");
  await writeFile(rawPath, Buffer.from(await response.arrayBuffer()));
  let targetIntegratedLufs = -16;
  let targetTruePeakDbtp = -1.7;
  let finishedPath;
  let finalLoudness;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const candidatePath = join(workDir, `normalized-${attempt}.mp3`);
    renderNormalizedAudio(rawPath, candidatePath, targetIntegratedLufs, targetTruePeakDbtp, audio);
    finalLoudness = measureLoudness(candidatePath);
    finishedPath = candidatePath;
    const measured = Number(finalLoudness.input_i);
    const measuredPeak = Number(finalLoudness.input_tp);
    if (Number.isFinite(measured) && Math.abs(measured - (-16)) <= 0.25 && Number.isFinite(measuredPeak) && measuredPeak <= -1.45) break;
    targetIntegratedLufs += -16 - measured;
    if (Number.isFinite(measuredPeak) && measuredPeak > -1.45) {
      targetTruePeakDbtp -= measuredPeak - (-1.5) + 0.05;
    }
  }

  const measuredIntegratedLufs = Number(finalLoudness?.input_i);
  const measuredTruePeakDbtp = Number(finalLoudness?.input_tp);
  if (!Number.isFinite(measuredIntegratedLufs) || Math.abs(measuredIntegratedLufs - (-16)) > 0.25) {
    throw new Error(`Finished audio measures ${finalLoudness.input_i} LUFS; expected -16 ±0.25 LUFS.`);
  }
  if (!Number.isFinite(measuredTruePeakDbtp) || measuredTruePeakDbtp > -1.45) {
    throw new Error(`Finished audio true peak is ${finalLoudness.input_tp} dBTP; expected no higher than -1.45 dBTP.`);
  }

  const ffprobe = spawnSync("ffprobe", [
    "-v", "error", "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", finishedPath
  ], { encoding: "utf8" });
  if (ffprobe.error) throw ffprobe.error;
  if (ffprobe.status !== 0) throw new Error(`Audio duration check failed: ${ffprobe.stderr}`);
  const durationSeconds = Number(ffprobe.stdout.trim());
  if (!Number.isFinite(durationSeconds)) throw new Error("Audio duration is not readable.");
  if (durationSeconds < audio.minSeconds || durationSeconds > audio.maxSeconds) {
    throw new Error(`Audio duration ${durationSeconds.toFixed(1)}s is outside ${audio.minSeconds}-${audio.maxSeconds}s.`);
  }

  const audioBuffer = await readFile(finishedPath);
  const metadata = {
    issue: issue.number,
    slug: issue.slug,
    title: audio.title,
    source: audio.src,
    transcript: audio.transcriptFile,
    wordCount,
    durationSeconds: Number(durationSeconds.toFixed(3)),
    voiceId,
    modelId: MODEL_ID,
    normalization: "measured two-pass loudnorm with codec compensation / -16 LUFS / ≤ -1.5 dBTP / mono / 96 kbps MP3",
    measuredIntegratedLufs,
    measuredTruePeakDbtp,
    sha256: createHash("sha256").update(audioBuffer).digest("hex"),
    generatedAt: new Date().toISOString()
  };

  const suffix = `${process.pid}-${Date.now()}.tmp`;
  const outputTemp = `${outputPath}.${suffix}`;
  const transcriptTemp = `${transcriptPath}.${suffix}`;
  const metadataTemp = `${metadataPath}.${suffix}`;
  await copyFile(finishedPath, outputTemp);
  await writeFile(transcriptTemp, `${narration}\n`);
  await writeFile(metadataTemp, `${JSON.stringify(metadata, null, 2)}\n`);
  await rename(outputTemp, outputPath);
  await rename(transcriptTemp, transcriptPath);
  await rename(metadataTemp, metadataPath);
  console.log(`Generated The Standard No. ${issue.number} audio (${durationSeconds.toFixed(1)}s, ${wordCount} words).`);
} finally {
  await rm(workDir, { recursive: true, force: true });
}
