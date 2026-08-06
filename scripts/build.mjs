import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { issues } from "../content/issues.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = join(root, "dist");
const defaultSiteUrl = "https://meltckr.github.io/the-standard/";
const configuredSiteUrl = process.env.STANDARD_SITE_URL ?? defaultSiteUrl;
const siteUrl = configuredSiteUrl.endsWith("/") ? configuredSiteUrl : `${configuredSiteUrl}/`;
const configuredBasePath = process.env.STANDARD_BASE_PATH ?? new URL(siteUrl).pathname;
const basePath = configuredBasePath === "/"
  ? "/"
  : `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}/`;
await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });
await mkdir(join(dist, "content"), { recursive: true });
await cp(join(root, "assets"), join(dist, "assets"), { recursive: true });
await cp(join(root, "content"), join(dist, "content"), { recursive: true });

const shell = await readFile(join(root, "index.html"), "utf8");
const pagesShell = shell
  .replace('<base href="/">', `<base href="${basePath}">`)
  .replaceAll(defaultSiteUrl, siteUrl);
await writeFile(join(dist, "index.html"), pagesShell);
await writeFile(join(dist, ".nojekyll"), "");

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMeta(html, attribute, key, value) {
  const expression = new RegExp(`<meta ${attribute}="${key}" content="[^"]*">`);
  return html.replace(expression, `<meta ${attribute}="${key}" content="${escapeAttribute(value)}">`);
}

function replaceCanonical(html, url) {
  return html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${escapeAttribute(url)}">`,
  );
}

function replaceStructuredData(html, data) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return html.replace(
    /<script type="application\/ld\+json" data-structured-data>.*?<\/script>/,
    `<script type="application/ld+json" data-structured-data>${json}</script>`,
  );
}

function isoDuration(seconds) {
  const rounded = Math.round(Number(seconds));
  const minutes = Math.floor(rounded / 60);
  const remainingSeconds = rounded % 60;
  return `PT${minutes}M${remainingSeconds}S`;
}

async function issueShell(issue) {
  const title = `${issue.title} — The Standard No. ${issue.number}`;
  const url = new URL(`issues/${issue.slug}/`, siteUrl).href;
  const imageName = issue.share?.image ?? (issue.number === "001" ? "og.png" : `og-${issue.number}.png`);
  const image = `${siteUrl}assets/${imageName}`;
  const imageAlt = issue.share?.alt ?? title;
  let audioMetadata;
  if (issue.audio?.metadataFile) {
    audioMetadata = JSON.parse(await readFile(join(root, issue.audio.metadataFile.replace(/^\/+/, "")), "utf8"));
  }
  const structuredArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: issue.title,
    alternativeHeadline: issue.share.hook,
    description: issue.summary,
    image: {
      "@type": "ImageObject",
      url: image,
      width: issue.share.imageWidth,
      height: issue.share.imageHeight,
      caption: imageAlt,
    },
    datePublished: issue.publishedAt,
    dateModified: issue.modifiedAt,
    author: { "@type": "Person", name: "Mel Tucker" },
    publisher: {
      "@type": "Organization",
      name: "Accelerated Velocity Consulting",
      logo: { "@type": "ImageObject", url: `${siteUrl}assets/avc-logo-horizontal-dark.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@type": "CreativeWorkSeries", name: "The Standard", url: siteUrl },
    articleSection: "Leadership",
    inLanguage: "en-US",
  };
  if (issue.audio && audioMetadata) {
    structuredArticle.associatedMedia = {
      "@type": "AudioObject",
      name: issue.audio.title,
      description: issue.audio.description,
      contentUrl: `${siteUrl}${issue.audio.src.replace(/^\/+/, "")}`,
      encodingFormat: "audio/mpeg",
      duration: isoDuration(audioMetadata.durationSeconds),
      transcript: issue.audio.transcript.join("\n\n"),
      inLanguage: "en-US",
    };
  }
  let html = pagesShell
    .replace("<title>The Standard</title>", `<title>${title}</title>`)
    .replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">');
  html = replaceCanonical(html, url);
  html = replaceMeta(html, "name", "description", issue.summary);
  html = replaceMeta(html, "property", "og:title", title);
  html = replaceMeta(html, "property", "og:description", issue.thesis);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:image", image);
  html = replaceMeta(html, "property", "og:image:secure_url", image);
  html = replaceMeta(html, "property", "og:image:width", issue.share.imageWidth);
  html = replaceMeta(html, "property", "og:image:height", issue.share.imageHeight);
  html = replaceMeta(html, "property", "og:image:alt", imageAlt);
  html = replaceMeta(html, "name", "twitter:title", title);
  html = replaceMeta(html, "name", "twitter:description", issue.thesis);
  html = replaceMeta(html, "name", "twitter:image", image);
  html = replaceMeta(html, "name", "twitter:image:alt", imageAlt);
  const articleMeta = [
    `<meta property="article:published_time" content="${escapeAttribute(issue.publishedAt)}">`,
    `<meta property="article:modified_time" content="${escapeAttribute(issue.modifiedAt)}">`,
    '<meta property="article:section" content="Leadership">',
    ...(issue.audio ? [`<link rel="alternate" type="audio/mpeg" href="${escapeAttribute(`${siteUrl}${issue.audio.src.replace(/^\/+/, "")}`)}" title="${escapeAttribute(issue.audio.title)}">`] : []),
  ].join("\n    ");
  html = html.replace(`<title>${title}</title>`, `${articleMeta}\n    <title>${title}</title>`);
  html = replaceStructuredData(html, structuredArticle);
  return html;
}

for (const issue of issues) {
  const issueDir = join(dist, "issues", issue.slug);
  await mkdir(issueDir, { recursive: true });
  await writeFile(join(issueDir, "index.html"), await issueShell(issue));
}

const sitemapEntries = [
  { url: siteUrl, modifiedAt: issues.at(-1)?.modifiedAt },
  ...issues.map((issue) => ({
    url: new URL(`issues/${issue.slug}/`, siteUrl).href,
    modifiedAt: issue.modifiedAt,
  })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry) => `  <url>\n    <loc>${entry.url}</loc>\n    <lastmod>${new Date(entry.modifiedAt).toISOString()}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap);
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`);
console.log(`Built The Standard with ${issues.length} issue routes to ${dist} for ${siteUrl}.`);
