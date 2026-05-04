#!/usr/bin/env bash
# Decompose each scroll-reassembly mp4 into a 120-frame JPG sequence at 1600x900.
# Run from the app root: bash scripts/extract-frames.sh
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p public/frames

# name:fps — fps chosen so duration_sec * fps == 120 frames
SOURCES=(
  "homepage-hero-reel:5"
  "smokey-cajun-reassembly:15"
  "simple-szn-reassembly:15"
  "garlicky-szn-reassembly:15"
  "lineup-shot:15"
)

for entry in "${SOURCES[@]}"; do
  name="${entry%:*}"
  fps="${entry#*:}"
  src="public/videos/${name}.mp4"
  out="public/frames/${name}"

  if [ ! -f "$src" ]; then
    echo "skip $name (no source mp4)"
    continue
  fi

  rm -rf "$out"
  mkdir -p "$out"

  ffmpeg -y -loglevel error \
    -i "$src" \
    -vf "fps=${fps},scale=1600:900" \
    -q:v 4 \
    "$out/f%03d.jpg"

  count=$(find "$out" -name 'f*.jpg' | wc -l)
  size=$(du -sh "$out" | cut -f1)
  printf "%-32s %4d frames %8s\n" "$name" "$count" "$size"
done

echo "---"
du -sh public/frames
