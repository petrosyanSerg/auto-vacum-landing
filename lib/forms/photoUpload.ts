/**
 * Validation rules for the dent-photo form, shared by the browser and the API
 * route. The browser copy exists to give fast feedback; the server copy is the
 * one that decides, because anything arriving over the network is untrusted.
 */

export const MAX_FILE_BYTES = 8 * 1024 * 1024;
export const MAX_FILES = 4;
export const MAX_DESCRIPTION_CHARS = 1200;
export const MAX_PHONE_CHARS = 32;

/** Allow-list, not a deny-list: anything not named here is rejected. */
export const ALLOWED_MIME = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
] as const;

export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'] as const;

export const ACCEPT_ATTRIBUTE = ALLOWED_MIME.join(',');

export type UploadRejection = 'tooManyFiles' | 'tooLarge' | 'badType';

function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase();
}

/**
 * A filename is attacker-controlled, so it is never trusted on its own: the
 * declared MIME type and the extension must both be on the allow-list, and the
 * stored name is regenerated rather than reused.
 */
export function validateFile(file: { name: string; size: number; type: string }): UploadRejection | null {
  if (file.size > MAX_FILE_BYTES) return 'tooLarge';
  if (!(ALLOWED_MIME as readonly string[]).includes(file.type)) return 'badType';
  if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(extensionOf(file.name))) return 'badType';
  return null;
}

export function validateFiles(
  files: Array<{ name: string; size: number; type: string }>,
): UploadRejection | null {
  if (files.length > MAX_FILES) return 'tooManyFiles';
  for (const file of files) {
    const problem = validateFile(file);
    if (problem) return problem;
  }
  return null;
}

/** Strips directory components and anything that is not a safe filename byte. */
export function safeFileName(original: string, index: number): string {
  const ext = extensionOf(original);
  const suffix = (ALLOWED_EXTENSIONS as readonly string[]).includes(ext) ? ext : 'jpg';
  return `dent-${Date.now()}-${index + 1}.${suffix}`;
}

/**
 * The only signal a caller cannot forge: the bytes themselves.
 *
 * A filename and a Content-Type both travel with the request and are both
 * chosen by whoever is uploading, so an executable called `dent.jpg` sent as
 * `image/jpeg` satisfies every check above. This one reads the file signature
 * and is the check that actually decides.
 *
 * Needs the first 12 bytes; the server reads only that slice, never the file.
 */
export function sniffImageType(head: Uint8Array): 'jpeg' | 'png' | 'webp' | 'heif' | null {
  const at = (i: number) => head[i];
  const ascii = (start: number, end: number) =>
    String.fromCharCode(...Array.from(head.slice(start, end)));

  if (head.length < 12) return null;

  // JPEG: FF D8 FF
  if (at(0) === 0xff && at(1) === 0xd8 && at(2) === 0xff) return 'jpeg';

  // PNG: 89 "PNG" CR LF SUB LF
  if (at(0) === 0x89 && ascii(1, 4) === 'PNG' && at(4) === 0x0d && at(5) === 0x0a) return 'png';

  // WebP: "RIFF" <4 byte size> "WEBP"
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'webp';

  // HEIC/HEIF: ISO base media box, "ftyp" at offset 4, then a HEIF brand.
  if (ascii(4, 8) === 'ftyp') {
    const brand = ascii(8, 12);
    const heifBrands = ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1', 'msf1'];
    if (heifBrands.includes(brand)) return 'heif';
  }

  return null;
}

export const SIGNATURE_HEAD_BYTES = 12;
