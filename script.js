import fs from "node:fs"
import path from "node:path";

const image = path.join(import.meta.dirname, "public", "image.png")
const buf = fs.readFileSync(image)
console.log(buf.length);