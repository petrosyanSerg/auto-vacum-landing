/**
 * Builds the static brand assets that ship in /public:
 *   - apple-icon.png       180x180 touch icon
 *   - og-default.jpg       1200x630 social preview
 *   - og-<service>.jpg     1200x630 social preview, one per service page
 *
 * Run: node scripts/generate-brand-assets.mjs
 *
 * The social preview is composited from a real frame of the workshop's own
 * work, darkened, with the mark and the wordmark drawn over it. All overlay
 * text is Latin-only so it renders identically on every machine that builds
 * this project; the localised words travel in og:title and og:description.
 */
import sharp from 'sharp';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const WORKS = path.join(PUBLIC, 'images', 'works');

/**
 * One card per shared page. `image` is a still from the published portfolio.
 * Headlines stay Latin-only so the card renders identically on every build
 * machine; the localised wording travels in og:title and og:description.
 */
const CARDS = [
  {
    file: 'og-default.jpg',
    image: 'roof-panel-restored',
    headline: 'Paintless dent repair',
    sub: 'Hail, impacts, minor accidents',
  },
  {
    file: 'og-pdr.jpg',
    image: 'restored-rear-quarter-panel',
    headline: 'Paintless dent repair',
    sub: 'Dents out, factory paint kept',
  },
  {
    file: 'og-auto-vacuum.jpg',
    image: 'reflection-line-panel-check',
    headline: 'Vacuum dent pulling',
    sub: 'Shallow dents lifted, no repainting',
  },
  {
    file: 'og-hail-damage.jpg',
    image: 'roof-panel-restored',
    headline: 'Hail damage repair',
    sub: 'Roof, hood and panels reshaped',
  },
  {
    file: 'og-dent-removal.jpg',
    image: 'door-crease-dent-white-car',
    headline: 'Dent removal',
    sub: 'Doors, wings, creases and edges',
  },
];

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="180" height="180">
  <rect width="32" height="32" rx="6" fill="#07090b"/>
  <g stroke="#eef2f5" stroke-width="1.9" stroke-linecap="round" fill="none">
    <path d="M6 10.5h20" opacity="0.4"/>
    <path d="M6 16h5.6l2.6 4 2.8-8 2.6 4H26"/>
    <path d="M6 21.5h20" opacity="0.4"/>
  </g>
</svg>`;

const OG_W = 1200;
const OG_H = 630;

const ogOverlay = (headline, sub) => `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0.35">
      <stop offset="0" stop-color="#07090b" stop-opacity="0.97"/>
      <stop offset="0.55" stop-color="#07090b" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#07090b" stop-opacity="0.18"/>
    </linearGradient>
  </defs>

  <rect width="${OG_W}" height="${OG_H}" fill="url(#scrim)"/>

  <!-- The motif: light lines across a panel, straight because the job is done -->
  <g stroke="#39424d" stroke-width="1.4" opacity="0.7">
    <path d="M0 96h1200M0 168h1200M0 534h1200"/>
  </g>

  <!-- Mark -->
  <g transform="translate(72 84)">
    <rect x="0.7" y="0.7" width="42.6" height="42.6" rx="5" fill="none" stroke="#eef2f5" stroke-width="1.6" opacity="0.4"/>
    <g stroke="#eef2f5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M7 15h30" opacity="0.45"/>
      <path d="M7 22h8.2l3.6 5.4 3.9-10.8 3.6 5.4H37"/>
      <path d="M7 29h30" opacity="0.45"/>
    </g>
  </g>

  <text x="132" y="115" fill="#eef2f5" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="26" font-weight="700" letter-spacing="4.5">AUTO VACUUM</text>

  <text x="72" y="268" fill="#eef2f5" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="66" font-weight="800" letter-spacing="-1.6">${headline}</text>
  <text x="72" y="344" fill="#9aa6b3" font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="40" font-weight="400" letter-spacing="-0.4">${sub}</text>

  <text x="72" y="470" fill="#7d8794" font-family="Consolas, Menlo, monospace"
        font-size="20" letter-spacing="3.4">PDR / AUTO VACUUM &#183; ABOVYAN, ARMENIA</text>
  <text x="72" y="524" fill="#eef2f5" font-family="Consolas, Menlo, monospace"
        font-size="42" font-weight="700" letter-spacing="1.5">099 22 95 90</text>
</svg>`;

async function main() {
  await mkdir(PUBLIC, { recursive: true });

  await sharp(Buffer.from(ICON_SVG))
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC, 'apple-icon.png'));
  console.log('apple-icon.png');

  for (const card of CARDS) {
    await sharp(path.join(WORKS, `${card.image}.webp`))
      .resize(OG_W, OG_H, { fit: 'cover', position: 'centre' })
      .modulate({ brightness: 1.28 })
      .composite([{ input: Buffer.from(ogOverlay(card.headline, card.sub)), top: 0, left: 0 }])
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(PUBLIC, card.file));
    console.log(card.file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
