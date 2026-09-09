/**
 * Converts the source stills (frames from the business's own YouTube videos)
 * into optimised, semantically named WebP assets under public/images.
 *
 * Run: node scripts/prepare-images.mjs
 * Source files live in _source-media/ and are git-ignored; the committed
 * output in public/images is what the site actually serves.
 */
import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.join(process.cwd(), '_source-media', 'yt');
const OUT_WORKS = path.join(process.cwd(), 'public', 'images', 'works');
const OUT_VIDEO = path.join(process.cwd(), 'public', 'images', 'video');

const SRC_PAIRS = path.join(process.cwd(), '_source-media', 'pairs');

/** Portrait work stills: 720x1280 source, cropped to a 4:5 editorial crop. */
const works = [
  ['qxpI-JVINtg_oar1', 'dent-assessment-marked-rear-quarter', 'north'],
  ['sNBGVbobXa8_oar1', 'metal-restoration-fender-removed', 'centre'],
  ['h0Z3qAob9jk_oar1', 'door-crease-dent-white-car', 'centre'],
  ['h0Z3qAob9jk_oar3', 'restored-front-fender-reflection', 'centre'],
  ['ia1YMuTUTAw_oar1', 'impact-dent-yellow-quarter-panel', 'centre'],
  ['ia1YMuTUTAw_oar3', 'restored-rear-quarter-panel', 'centre'],
  ['vBom9-rVDKM_oar3', 'roof-panel-restored', 'centre'],
  ['vBom9-rVDKM_oardefault', 'roof-dent-inspection', 'centre'],
  ['PHrzsklW36M_oar2', 'reflection-line-panel-check', 'centre'],
  ['skLR9KHU02Y_oar2', 'restored-front-wing-dark-car', 'centre'],
  ['qxpI-JVINtg_oar3', 'dent-mapping-close-up', 'centre'],
];

/**
 * Side-by-side before/after photographs shot in the workshop. Each source file
 * holds both frames in one square image, so it is split down the middle and
 * each half cropped to the same 4:5 window the works stills use — the hero
 * slider wipes one frame over the other, so the halves must stay aligned.
 * [file, output prefix, half width, left edge of the right half]
 */
const pairs = [
  ['arch-crease-pair', 'arch-crease', 474, 486],
];

/** Video poster frames, 16:9 for the lazy-loaded video wall. */
const videos = [
  'h0Z3qAob9jk', 'qxpI-JVINtg', 'vBom9-rVDKM', 'ia1YMuTUTAw', 'sNBGVbobXa8',
  'PHrzsklW36M', 'NXGxS93DUnw', 'vU2-zcZp0V4', 'skLR9KHU02Y',
];

const exists = async (p) => access(p).then(() => true).catch(() => false);

async function main() {
  await mkdir(OUT_WORKS, { recursive: true });
  await mkdir(OUT_VIDEO, { recursive: true });

  for (const [src, name, position] of works) {
    const file = path.join(SRC, `${src}.jpg`);
    if (!(await exists(file))) { console.warn(`skip (missing): ${src}`); continue; }
    await sharp(file)
      .resize(1000, 1250, { fit: 'cover', position })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(OUT_WORKS, `${name}.webp`));
    console.log(`works/${name}.webp`);
  }

  for (const [src, name, half, right] of pairs) {
    const file = path.join(SRC_PAIRS, `${src}.jpg`);
    if (!(await exists(file))) { console.warn(`skip (missing): ${src}`); continue; }
    for (const [side, left] of [['before', 0], ['after', right]]) {
      await sharp(file)
        .extract({ left, top: 184, width: half, height: Math.round(half * 1.25) })
        .resize(1000, 1250, { fit: 'fill' })
        .webp({ quality: 82, effort: 6 })
        .toFile(path.join(OUT_WORKS, `${name}-${side}.webp`));
      console.log(`works/${name}-${side}.webp`);
    }
  }

  for (const id of videos) {
    // Prefer the original-aspect frame, fall back to the 16:9 max-res still.
    const oar = path.join(SRC, `${id}_oardefault.jpg`);
    const wide = path.join(SRC, `${id}.jpg`);
    const file = (await exists(oar)) ? oar : wide;
    if (!(await exists(file))) { console.warn(`skip (missing): ${id}`); continue; }
    await sharp(file)
      .resize(640, 800, { fit: 'cover', position: 'centre' })
      .webp({ quality: 72, effort: 6 })
      .toFile(path.join(OUT_VIDEO, `${id}.webp`));
    console.log(`video/${id}.webp`);
  }
}

main().catch((error) => { console.error(error); process.exit(1); });
