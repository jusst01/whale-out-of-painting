import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const sourceImage = path.join(HERE, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || path.join(HERE, "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const destPath = path.join(outputDir, "entry.png");

try {
  fs.copyFileSync(sourceImage, destPath);
  const stats = fs.statSync(destPath);
  if (stats.size === 0) {
    console.error("Error: Copied file is empty.");
    process.exit(1);
  }
  console.log(`Successfully copied to ${destPath} (${stats.size} bytes)`);
  process.exit(0);
} catch (err) {
  console.error("Error copying file:", err);
  process.exit(1);
}
