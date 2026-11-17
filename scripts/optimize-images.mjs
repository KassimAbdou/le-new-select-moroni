/**
 * Converts the raw photos in `src/assets/images/original` into optimized WebP
 * files used by the app. Keeps the originals untouched so the conversion can
 * be reproduced (npm run optimize:images).
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(scriptDir, '../src/assets/images');
const rawDir = path.join(imagesDir, 'original');

const MAX_WIDTH = 1600;
const QUALITY = 80;

const files = (await readdir(rawDir)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

await mkdir(imagesDir, { recursive: true });

for (const file of files) {
  const outputName = `${path.basename(file, path.extname(file))}.webp`;
  const outputPath = path.join(imagesDir, outputName);

  await sharp(path.join(rawDir, file))
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outputPath);

  const [before, after] = await Promise.all([
    stat(path.join(rawDir, file)),
    stat(outputPath),
  ]);

  console.log(
    `${outputName}: ${(before.size / 1024).toFixed(0)} Ko -> ${(after.size / 1024).toFixed(0)} Ko`,
  );
}

// Image de partage sociaux (format 1,91:1 attendu par Open Graph).
const ogSource = files.find((file) => file.startsWith('hero_'));
if (ogSource) {
  const publicDir = path.resolve(scriptDir, '../public');
  await mkdir(publicDir, { recursive: true });
  await sharp(path.join(rawDir, ogSource))
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('og-image.jpg générée dans public/');
}
