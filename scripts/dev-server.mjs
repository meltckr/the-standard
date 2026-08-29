import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.(\/|\\|$))+/, "");
  let file = join(root, requested);
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(root, "index.html");
  const fileSize = statSync(file).size;
  const headers = {
    "Content-Type": mime[extname(file)] || "application/octet-stream",
    "Cache-Control": "no-store",
    "Accept-Ranges": "bytes"
  };
  const range = request.headers.range?.match(/^bytes=(\d*)-(\d*)$/);

  if (range) {
    const suffixLength = range[1] === "" ? Number(range[2]) : null;
    const start = suffixLength !== null ? Math.max(0, fileSize - suffixLength) : Number(range[1]);
    const end = suffixLength !== null || range[2] === "" ? fileSize - 1 : Math.min(Number(range[2]), fileSize - 1);
    if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start > end || start >= fileSize) {
      response.writeHead(416, { ...headers, "Content-Range": `bytes */${fileSize}` });
      response.end();
      return;
    }
    response.writeHead(206, {
      ...headers,
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Content-Length": end - start + 1
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(file, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, { ...headers, "Content-Length": fileSize });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`The Standard preview: http://127.0.0.1:${port}`);
});
