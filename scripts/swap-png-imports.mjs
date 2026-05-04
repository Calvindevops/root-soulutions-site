// For every .webp we just generated, rewrite matching "/path.png" string refs
// in lib/, components/, and app/ to "/path.webp". Logs every change.

import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { join, extname, relative } from "node:path";

const ROOT = new URL("../", import.meta.url).pathname;
const PUBLIC_DIR = join(ROOT, "public");
const SCAN_DIRS = ["lib", "components", "app"].map((d) => join(ROOT, d));
const SCAN_EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.isFile()) yield path;
  }
}

const webpPaths = [];
for await (const file of walk(PUBLIC_DIR)) {
  if (extname(file).toLowerCase() === ".webp") {
    webpPaths.push("/" + relative(PUBLIC_DIR, file));
  }
}

const codeFiles = [];
for (const dir of SCAN_DIRS) {
  for await (const file of walk(dir)) {
    if (SCAN_EXTS.has(extname(file))) codeFiles.push(file);
  }
}

let totalEdits = 0;
const filesChanged = new Set();
for (const file of codeFiles) {
  let src = await readFile(file, "utf8");
  let edits = 0;
  for (const webp of webpPaths) {
    const png = webp.replace(/\.webp$/, ".png");
    // Match "/path/to/file.png" or '/path/to/file.png' as a complete string
    const needle = png;
    if (src.includes(needle)) {
      const before = src;
      src = src.split(needle).join(webp);
      const count = (before.length - src.length) / (needle.length - webp.length);
      edits += Math.round(count);
    }
  }
  if (edits > 0) {
    await writeFile(file, src);
    filesChanged.add(file);
    totalEdits += edits;
    console.log(`${edits.toString().padStart(3)} edits  ${relative(ROOT, file)}`);
  }
}

console.log(`\n${totalEdits} replacements across ${filesChanged.size} files`);
