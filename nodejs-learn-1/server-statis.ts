import http, { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";


interface FileMetaData {
  status: number;
  filename: string;
}
const mimeMap: Record<string, string> = {
  ".html": "text/html",
  ".png": "image/png",
  ".css": "text/css",
  ".js": "application/javascript",
};
const urlMap: Record<string, FileMetaData> = {
  "/": { status: 200, filename: "/index.html" },
  "/image": { status: 200, filename: "/image.png" },
  "/index" : {status : 200, filename : "/index.html"},
  "/style": { status: 200, filename: "/style.css" },
  "/script": { status: 200, filename: "/script.js" },
};

const PUBLIC_DIR = path.join(import.meta.dirname, "public");

console.log("Script dimulai...");
const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const targetUrl = urlMap[req.url!];
      if (!targetUrl) throw new Error("url tidak valid");

      const targetFile = path.join(PUBLIC_DIR, targetUrl.filename);
      const ext = path.extname(targetUrl.filename);

      res.writeHead(200, { "content-type": mimeMap[ext] || "text/plain" });

      await pipeline(fs.createReadStream(targetFile), res);
      console.log("Stream berhasil");

    } catch (err) {
      const error = err as Error;
      console.error(
        `Gagal memuat URL: "${req.url}" -> Alasan: ${error.message}`,
      );
      res.writeHead(404);
      res.end("Page not found \nPlease acces /image, /script, or /style");
    }
  },
);

console.log("Mencoba menjalankan server.listen...");
server.listen(3000, () => {
  console.log("Server siap! Buka http://localhost:3000 di browsermu.");
});
