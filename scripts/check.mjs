import { readFile, readdir } from "node:fs/promises";
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
}

await readdir(join(root, "assets"));
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Checked ${required.length} publication files and ${content.issues.length} structured issue.`);
