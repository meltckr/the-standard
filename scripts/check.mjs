import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const required = ["index.html", "assets/styles.css", "assets/site.js", "content/brand.js", "content/issues.js"];
const errors = [];

for (const file of required) {
  const text = await readFile(join(root, file), "utf8");
  if (!text.trim()) errors.push(`${file} is empty`);
  if (/\b(TODO|FIXME|lorem ipsum)\b/i.test(text)) errors.push(`${file} contains placeholder text`);
}

const html = await readFile(join(root, "index.html"), "utf8");
if (!html.includes('lang="en"')) errors.push("Document language is missing");
if (!html.includes('name="viewport"')) errors.push("Viewport metadata is missing");

const content = await import("../content/issues.js");
const { brand } = await import("../content/brand.js");
if (!brand.logos.onDark || !brand.logos.onLight) errors.push("AVC header/footer brand assets are missing");
if (!brand.palette.blue || !brand.palette.black || !brand.palette.white) errors.push("AVC core palette is incomplete");
for (const issue of content.issues) {
  const fields = ["number", "slug", "title", "thesis", "summary", "readingTime", "publicationDate", "sections", "applicationPoints", "closingQuestion", "closingStandard", "sources"];
  for (const field of fields) {
    if (!issue[field] || issue[field].length === 0) errors.push(`Issue ${issue.number} is missing ${field}`);
  }
  if (!issue.share?.url) errors.push(`Issue ${issue.number} is missing its permanent share URL`);
  if (!issue.share?.image) errors.push(`Issue ${issue.number} is missing its Open Graph image`);
  if (!issue.share?.hook) errors.push(`Issue ${issue.number} is missing its Open Graph hook`);
  if (!issue.share?.alt) errors.push(`Issue ${issue.number} is missing Open Graph image alt text`);
  if (!issue.share?.message) errors.push(`Issue ${issue.number} is missing its iMessage copy`);
  if (issue.audio) {
    const audioFields = ["label", "title", "description", "durationLabel", "src", "transcriptFile", "metadataFile", "requiredClosing", "transcript"];
    for (const field of audioFields) {
      if (!issue.audio[field] || issue.audio[field].length === 0) errors.push(`Issue ${issue.number} audio is missing ${field}`);
    }
    const narration = issue.audio.transcript.join("\n\n").trim();
    if (!narration.endsWith(issue.audio.requiredClosing)) errors.push(`Issue ${issue.number} audio has the wrong closing line`);
    if (narration.split(/\s+/).length < 500 || narration.split(/\s+/).length > 950) errors.push(`Issue ${issue.number} audio transcript is outside 500-950 words`);
    if (!Number.isFinite(issue.audio.minSeconds) || !Number.isFinite(issue.audio.maxSeconds) || issue.audio.minSeconds >= issue.audio.maxSeconds) errors.push(`Issue ${issue.number} audio duration contract is invalid`);
    try {
      const audioPath = join(root, issue.audio.src.replace(/^\/+/, ""));
      const audioStats = await stat(audioPath);
      if (audioStats.size < 10_000) errors.push(`Issue ${issue.number} audio file is unexpectedly small`);
      const probe = spawnSync("ffprobe", [
        "-v", "error", "-show_entries", "stream=codec_name,channels,bit_rate:format=duration",
        "-of", "json", audioPath
      ], { encoding: "utf8" });
      if (probe.status !== 0) {
        errors.push(`Issue ${issue.number} audio file cannot be probed`);
      } else {
        const details = JSON.parse(probe.stdout);
        const stream = details.streams?.[0];
        const duration = Number(details.format?.duration);
        if (!Number.isFinite(duration) || duration < issue.audio.minSeconds || duration > issue.audio.maxSeconds) errors.push(`Issue ${issue.number} probed audio duration is outside its contract`);
        if (stream?.codec_name !== "mp3" || stream?.channels !== 1 || Number(stream?.bit_rate) !== 96_000) errors.push(`Issue ${issue.number} audio must be mono 96 kbps MP3`);
      }
    } catch {
      errors.push(`Issue ${issue.number} audio file is missing`);
    }
    try {
      const transcriptPath = join(root, issue.audio.transcriptFile.replace(/^\/+/, ""));
      const savedTranscript = (await readFile(transcriptPath, "utf8")).trim();
      if (savedTranscript !== narration) errors.push(`Issue ${issue.number} saved audio transcript does not match structured content`);
    } catch {
      errors.push(`Issue ${issue.number} saved audio transcript is missing`);
    }
    try {
      const metadataPath = join(root, issue.audio.metadataFile.replace(/^\/+/, ""));
      const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
      if (metadata.issue !== issue.number) errors.push(`Issue ${issue.number} audio metadata points to another issue`);
      if (metadata.source !== issue.audio.src) errors.push(`Issue ${issue.number} audio metadata has the wrong source path`);
      if (!Number.isFinite(metadata.durationSeconds) || metadata.durationSeconds < issue.audio.minSeconds || metadata.durationSeconds > issue.audio.maxSeconds) errors.push(`Issue ${issue.number} audio duration is outside its contract`);
      if (!metadata.normalization?.includes("two-pass loudnorm")) errors.push(`Issue ${issue.number} audio metadata is missing two-pass normalization`);
      if (!Number.isFinite(metadata.measuredIntegratedLufs) || Math.abs(metadata.measuredIntegratedLufs - (-16)) > 0.25) errors.push(`Issue ${issue.number} audio loudness is outside -16 ±0.25 LUFS`);
      if (!Number.isFinite(metadata.measuredTruePeakDbtp) || metadata.measuredTruePeakDbtp > -1.45) errors.push(`Issue ${issue.number} audio true peak exceeds the -1.5 dBTP ceiling`);
      const audioPath = join(root, issue.audio.src.replace(/^\/+/, ""));
      const digest = createHash("sha256").update(await readFile(audioPath)).digest("hex");
      if (metadata.sha256 !== digest) errors.push(`Issue ${issue.number} audio hash does not match metadata`);
    } catch {
      errors.push(`Issue ${issue.number} audio metadata is missing or invalid`);
    }
  }
}

await readdir(join(root, "assets"));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Checked ${required.length} publication files and ${content.issues.length} structured issue.`);
