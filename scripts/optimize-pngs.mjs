// One-shot: convert public/**/*.png > 500 KB to .webp alongside originals.
// Originals are NOT deleted. Skips files that already have an up-to-date .webp.

import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = new URL("../public/", import.meta.url).pathname;
const MIN_BYTES = 500 * 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.isFile()) yield path;
  }
}

const targets = [];
for await (const file of walk(PUBLIC_DIR)) {
  if (extname(file).toLowerCase() !== ".png") continue;
  const s = await stat(file);
  if (s.size < MIN_BYTES) continue;
  targets.push({ file, size: s.size });
}
targets.sort((a, b) => b.size - a.size);

let totalIn = 0;
let totalOut = 0;
for (const { file, size } of targets) {
  const out = file.replace(/\.png$/i, ".webp");
  try {
    const existing = await stat(out).catch(() => null);
    if (existing && existing.mtimeMs >= (await stat(file)).mtimeMs) {
      console.log(`skip (up-to-date) ${out}`);
      continue;
    }
    await sharp(file).webp({ quality: 82, effort: 5 }).toFile(out);
    const newSize = (await stat(out)).size;
    totalIn += size;
    totalOut += newSize;
    const pct = ((1 - newSize / size) * 100).toFixed(1);
    console.log(
      `${(size / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB (${pct}% smaller)  ${file.replace(PUBLIC_DIR, "")}`,
    );
  } catch (err) {
    console.error(`FAIL ${file}:`, err.message);
  }
}

console.log(
  `\nTotal: ${(totalIn / 1024 / 1024).toFixed(1)}MB -> ${(totalOut / 1024 / 1024).toFixed(1)}MB (saved ${((totalIn - totalOut) / 1024 / 1024).toFixed(1)}MB across ${targets.length} files)`,
);
