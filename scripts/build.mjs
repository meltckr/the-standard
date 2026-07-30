import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { issues } from "../content/issues.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });
await mkdir(join(dist, "content"), { recursive: true });
await cp(join(root, "assets"), join(dist, "assets"), { recursive: true });
await cp(join(root, "content"), join(dist, "content"), { recursive: true });

const shell = await readFile(join(root, "index.html"), "utf8");
const pagesShell = shell.replace('<base href="/">', '<base href="/the-standard/">');
await writeFile(join(dist, "index.html"), pagesShell);
await writeFile(join(dist, ".nojekyll"), "");

function replaceMeta(html, attribute, key, value) {
  const expression = new RegExp(`<meta ${attribute}="${key}" content="[^"]*">`);
  return html.replace(expression, `<meta ${attribute}="${key}" content="${value}">`);
}

function issueShell(issue) {
  const title = `${issue.title} — The Standard No. ${issue.number}`;
  const url = issue.share.url;
  const imageName = issue.share?.image ?? (issue.number === "001" ? "og.png" : `og-${issue.number}.png`);
  const image = `https://meltckr.github.io/the-standard/assets/${imageName}`;
  const imageAlt = issue.share?.alt ?? title;
  let html = pagesShell
    .replace("<title>The Standard</title>", `<title>${title}</title>`)
    .replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">');
  html = replaceMeta(html, "name", "description", issue.summary);
  html = replaceMeta(html, "property", "og:title", title);
  html = replaceMeta(html, "property", "og:description", issue.thesis);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:image", image);
  html = replaceMeta(html, "property", "og:image:alt", imageAlt);
  html = replaceMeta(html, "name", "twitter:title", title);
  html = replaceMeta(html, "name", "twitter:description", issue.thesis);
  html = replaceMeta(html, "name", "twitter:image", image);
  return html;
}

for (const issue of issues) {
  const issueDir = join(dist, "issues", issue.slug);
  await mkdir(issueDir, { recursive: true });
  await writeFile(join(issueDir, "index.html"), issueShell(issue));
}
console.log(`Built The Standard with ${issues.length} issue routes to ${dist}.`);
