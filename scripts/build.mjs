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
for (const issue of issues) {
  const issueDir = join(dist, "issues", issue.slug);
  await mkdir(issueDir, { recursive: true });
  await writeFile(join(issueDir, "index.html"), pagesShell);
}
console.log(`Built The Standard with ${issues.length} issue route to ${dist}.`);
