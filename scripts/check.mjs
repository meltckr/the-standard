import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const required = ["index.html", "assets/styles.css", "assets/site.js", "content/brand.js", "content/issues.js"];
const errors = [];

function applyPronunciationAliases(text, aliases = []) {
  return aliases.reduce((speechInput, alias) => speechInput.replaceAll(alias.written, alias.spoken), text);
}

for (const file of required) {
  const text = await readFile(join(root, file), "utf8");
  if (!text.trim()) errors.push(`${file} is empty`);
  if (/\b(TODO|FIXME|lorem ipsum)\b/i.test(text)) errors.push(`${file} contains placeholder text`);
}

const html = await readFile(join(root, "index.html"), "utf8");
if (!html.includes('lang="en"')) errors.push("Document language is missing");
if (!html.includes('name="viewport"')) errors.push("Viewport metadata is missing");
for (const token of [
  'rel="canonical"',
  'name="robots"',
  'property="og:image:secure_url"',
  'property="og:image:width"',
  'property="og:image:height"',
  'name="twitter:image:alt"',
  'type="application/ld+json" data-structured-data',
]) {
  if (!html.includes(token)) errors.push(`Publishing metadata shell is missing ${token}`);
}

const content = await import("../content/issues.js");
const { brand } = await import("../content/brand.js");
if (!brand.logos.onDark || !brand.logos.onLight) errors.push("AVC header/footer brand assets are missing");
if (!brand.palette.blue || !brand.palette.black || !brand.palette.white) errors.push("AVC core palette is incomplete");
for (const issue of content.issues) {
  const draft = issue.status === "draft";
  const fields = ["number", "slug", "title", "thesis", "summary", "readingTime", "publicationDate", "modifiedAt", "sections", "applicationPoints", "closingQuestion", "closingStandard", "sources", ...(!draft ? ["publishedAt"] : [])];
  for (const field of fields) {
    if (field === "applicationPoints" && Array.isArray(issue[field]) && issue[field].length === 0 && issue.pageTranscriptFile && issue.textApproval?.status === "approved") continue;
    if (!issue[field] || issue[field].length === 0) errors.push(`Issue ${issue.number} is missing ${field}`);
  }
  if (!issue.share?.url) errors.push(`Issue ${issue.number} is missing its permanent share URL`);
  if (!issue.share?.image) errors.push(`Issue ${issue.number} is missing its Open Graph image`);
  if (!issue.share?.hook) errors.push(`Issue ${issue.number} is missing its Open Graph hook`);
  if (!issue.share?.alt) errors.push(`Issue ${issue.number} is missing Open Graph image alt text`);
  if (!issue.share?.message) errors.push(`Issue ${issue.number} is missing its iMessage copy`);
  if (!Number.isInteger(issue.share?.imageWidth) || !Number.isInteger(issue.share?.imageHeight)) errors.push(`Issue ${issue.number} share image dimensions are missing`);
  if ((draft ? Boolean(issue.publishedAt) : !Number.isFinite(Date.parse(issue.publishedAt))) || !Number.isFinite(Date.parse(issue.modifiedAt))) errors.push(`Issue ${issue.number} has invalid publication timestamps`);
  if (Date.parse(issue.modifiedAt) < Date.parse(issue.publishedAt)) errors.push(`Issue ${issue.number} modifiedAt precedes publishedAt`);
  const expectedUrl = `https://meltckr.github.io/the-standard/issues/${issue.slug}/`;
  if (issue.share?.url !== expectedUrl) errors.push(`Issue ${issue.number} has the wrong canonical share URL`);
  for (const section of issue.sections) {
    if (section.examples && (!Array.isArray(section.examples) || !section.examples.length || section.examples.some((example) => !example.role?.trim() || !example.text?.trim()))) errors.push(`Issue ${issue.number} has an incomplete role example`);
  }
  try {
    const imagePath = join(root, "assets", issue.share.image);
    const image = await readFile(imagePath);
    const pngSignature = image.subarray(1, 4).toString("ascii") === "PNG";
    let width = pngSignature && image.length >= 24 ? image.readUInt32BE(16) : 0;
    let height = pngSignature && image.length >= 24 ? image.readUInt32BE(20) : 0;
    if (image.length > 4 && image[0] === 0xff && image[1] === 0xd8) {
      const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
      let offset = 2;
      while (offset + 4 <= image.length) {
        if (image[offset++] !== 0xff) break;
        while (image[offset] === 0xff) offset++;
        const marker = image[offset++];
        if (marker === 0xd9 || marker === 0xda) break;
        if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
        if (offset + 2 > image.length) break;
        const length = image.readUInt16BE(offset);
        if (length < 2 || offset + length > image.length) break;
        if (frameMarkers.has(marker) && length >= 8) {
          height = image.readUInt16BE(offset + 3);
          width = image.readUInt16BE(offset + 5);
          break;
        }
        offset += length;
      }
    }
    if (width !== issue.share.imageWidth || height !== issue.share.imageHeight) errors.push(`Issue ${issue.number} share image dimensions do not match its metadata`);
    if (width < 1200 || Math.abs(width / height - 1.905) > 0.01) errors.push(`Issue ${issue.number} share image must preserve the large-image social ratio`);
  } catch {
    errors.push(`Issue ${issue.number} share image is missing`);
  }
  if (issue.audio) {
    const audioFields = ["label", "title", "description", "durationLabel", "src", "transcriptFile", "metadataFile", "requiredClosing", "transcript"];
    for (const field of audioFields) {
      if (!issue.audio[field] || issue.audio[field].length === 0) errors.push(`Issue ${issue.number} audio is missing ${field}`);
    }
    const narration = issue.audio.transcript.join("\n\n").trim();
    const pronunciationAliases = issue.audio.pronunciationAliases ?? [];
    if (!Array.isArray(pronunciationAliases)) errors.push(`Issue ${issue.number} pronunciation aliases must be an array`);
    for (const alias of pronunciationAliases) {
      if (!alias?.written || !alias?.spoken || alias.written === alias.spoken) errors.push(`Issue ${issue.number} has an invalid pronunciation alias`);
      if (!narration.includes(alias?.written)) errors.push(`Issue ${issue.number} pronunciation alias source is absent from the transcript`);
    }
    const speechInput = applyPronunciationAliases(narration, pronunciationAliases);
    if (!narration.endsWith(issue.audio.requiredClosing)) errors.push(`Issue ${issue.number} audio has the wrong closing line`);
    const minWords = issue.audio.minWords ?? 500;
    const maxWords = issue.audio.maxWords ?? 950;
    if (narration.split(/\s+/).length < minWords || narration.split(/\s+/).length > maxWords) errors.push(`Issue ${issue.number} audio transcript is outside ${minWords}-${maxWords} words`);
    if (!Number.isFinite(issue.audio.minSeconds) || !Number.isFinite(issue.audio.maxSeconds) || issue.audio.minSeconds >= issue.audio.maxSeconds) errors.push(`Issue ${issue.number} audio duration contract is invalid`);
    try {
      const audioPath = join(root, issue.audio.src.replace(/^\/+/, ""));
      const audioStats = await stat(audioPath);
      if (audioStats.size < 10_000) errors.push(`Issue ${issue.number} audio file is unexpectedly small`);
      const probe = spawnSync("ffprobe", [
        "-v", "error", "-show_entries", "stream=codec_name,channels,bit_rate,sample_rate:format=duration",
        "-of", "json", audioPath
      ], { encoding: "utf8" });
      if (probe.status !== 0) {
        errors.push(`Issue ${issue.number} audio file cannot be probed`);
      } else {
        const details = JSON.parse(probe.stdout);
        const stream = details.streams?.[0];
        const duration = Number(details.format?.duration);
        if (!Number.isFinite(duration) || duration < issue.audio.minSeconds || duration > issue.audio.maxSeconds) errors.push(`Issue ${issue.number} probed audio duration is outside its contract`);
        const bitrateKbps = issue.audio.bitrateKbps ?? 96;
        if (stream?.codec_name !== "mp3" || stream?.channels !== 1 || Number(stream?.bit_rate) !== bitrateKbps * 1000) errors.push(`Issue ${issue.number} audio must be mono ${bitrateKbps} kbps MP3`);
        if (issue.audio.sampleRateHz && Number(stream?.sample_rate) !== issue.audio.sampleRateHz) errors.push(`Issue ${issue.number} audio must use ${issue.audio.sampleRateHz} Hz`);
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
      if (JSON.stringify(metadata.pronunciationAliases ?? []) !== JSON.stringify(pronunciationAliases)) errors.push(`Issue ${issue.number} audio pronunciation metadata is stale`);
      if (metadata.transcriptSha256 !== createHash("sha256").update(narration).digest("hex")) errors.push(`Issue ${issue.number} transcript hash does not match metadata`);
      if (metadata.speechInputSha256 !== createHash("sha256").update(speechInput).digest("hex")) errors.push(`Issue ${issue.number} speech-input hash does not match pronunciation aliases`);
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
