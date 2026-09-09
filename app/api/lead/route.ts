import { NextResponse } from 'next/server';

import { LEAD_ENDPOINT } from '@/config/business';
import {
  MAX_DESCRIPTION_CHARS,
  MAX_FILES,
  MAX_PHONE_CHARS,
  safeFileName,
  SIGNATURE_HEAD_BYTES,
  sniffImageType,
  validateFiles,
} from '@/lib/forms/photoUpload';

export const runtime = 'nodejs';

/**
 * Receives a dent photo and forwards it to whatever inbox the owner configures
 * in LEAD_FORM_ENDPOINT.
 *
 * With no endpoint configured the route answers 501 and the form says plainly
 * that it is switched off. It never pretends a submission was received.
 *
 * Everything crossing this boundary is untrusted. File count, size, declared
 * type and extension are re-checked here, and then the file signature is read,
 * because the name and the Content-Type are both chosen by the caller and an
 * executable can satisfy either. Filenames are regenerated rather than reused,
 * and the free-text fields are length-capped. Nothing is written to this
 * server's filesystem.
 */
export async function POST(request: Request) {
  if (!LEAD_ENDPOINT) {
    return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const files = form.getAll('photos').filter((entry): entry is File => entry instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: 'noFile' }, { status: 400 });
  }

  const problem = validateFiles(files);
  if (problem) {
    return NextResponse.json({ error: problem }, { status: 400 });
  }

  // The name and the declared type are both chosen by the caller, so an
  // executable named dent.jpg and sent as image/jpeg satisfies both. The file
  // signature is the only signal that cannot be forged, so it is what decides.
  for (const file of files) {
    const head = new Uint8Array(await file.slice(0, SIGNATURE_HEAD_BYTES).arrayBuffer());
    if (!sniffImageType(head)) {
      return NextResponse.json({ error: 'badType' }, { status: 400 });
    }
  }

  const description = String(form.get('description') ?? '').slice(0, MAX_DESCRIPTION_CHARS);
  const phone = String(form.get('phone') ?? '').slice(0, MAX_PHONE_CHARS);

  const outgoing = new FormData();
  outgoing.set('description', description);
  outgoing.set('phone', phone);
  files.slice(0, MAX_FILES).forEach((file, index) => {
    outgoing.append('photos', file, safeFileName(file.name, index));
  });

  try {
    const response = await fetch(LEAD_ENDPOINT, { method: 'POST', body: outgoing });
    if (!response.ok) {
      return NextResponse.json({ error: 'upstream' }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
