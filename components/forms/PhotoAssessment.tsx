'use client';

import { useId, useRef, useState } from 'react';

import type { Dictionary } from '@/lib/i18n/dictionaries';
import { track } from '@/lib/analytics/events';
import {
  ACCEPT_ATTRIBUTE,
  MAX_FILES,
  validateFiles,
  type UploadRejection,
} from '@/lib/forms/photoUpload';
import { Button } from '@/components/ui/Button';
import { CloseIcon } from '@/components/ui/Icons';
import styles from './PhotoAssessment.module.scss';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

/**
 * "Send a photo of the dent" — the second-best conversion after a phone call,
 * for someone who is standing next to the car but cannot talk right now.
 *
 * When no destination is configured the form renders read-only with a plain
 * statement that it is switched off, and points at Instagram and the phone
 * instead. It never accepts a submission it cannot deliver.
 */
export function PhotoAssessment({ dict, enabled }: { dict: Dictionary; enabled: boolean }) {
  const copy = dict.contact;
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<UploadRejection | 'noFile' | 'send' | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const fileId = useId();
  const descriptionId = useId();
  const phoneId = useId();

  const replaceFiles = (next: File[]) => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles(next);
    setPreviews(next.map((file) => URL.createObjectURL(file)));
  };

  const onPick = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const picked = Array.from(list).slice(0, MAX_FILES);
    const problem = validateFiles(picked);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    replaceFiles(picked);
    track('photo_upload_start', { count: picked.length });
  };

  const removeAt = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    replaceFiles(next);
    if (next.length === 0 && inputRef.current) inputRef.current.value = '';
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enabled || status === 'sending') return;

    if (files.length === 0) {
      setError('noFile');
      return;
    }

    setStatus('sending');
    setError(null);

    const body = new FormData(event.currentTarget);
    body.delete('photos');
    files.forEach((file) => body.append('photos', file));

    try {
      const response = await fetch('/api/lead', { method: 'POST', body });
      if (!response.ok) throw new Error(String(response.status));
      setStatus('sent');
      replaceFiles([]);
      track('contact_form_submit');
    } catch {
      setStatus('failed');
      setError('send');
    }
  };

  const errorMessage =
    error === 'send'
      ? copy.errorBody
      : error === 'noFile'
        ? copy.errors.noFile
        : error
          ? copy.errors[error]
          : null;

  if (status === 'sent') {
    return (
      <div className={styles.form}>
        <div className={styles.status} role="status">
          <p className={styles.noticeTitle}>{copy.successTitle}</p>
          <p className={styles.noticeBody}>{copy.successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {!enabled ? (
        <div className={styles.disabledNotice}>
          <p className={styles.noticeTitle}>{copy.disabledTitle}</p>
          <p className={styles.noticeBody}>{copy.disabledBody}</p>
        </div>
      ) : null}

      <div className={styles.field}>
        <span className={styles.label}>{copy.photoLabel}</span>
        <input
          ref={inputRef}
          id={fileId}
          className={styles.fileInput}
          type="file"
          name="photos"
          accept={ACCEPT_ATTRIBUTE}
          multiple
          disabled={!enabled}
          onChange={(event) => onPick(event.target.files)}
        />
        <label className={styles.drop} htmlFor={fileId}>
          <span className={styles.dropTitle}>
            {files.length > 0 ? copy.photoChange : copy.photoChoose}
          </span>
          <span className={styles.hint}>{copy.photoHint}</span>
        </label>

        {previews.length > 0 ? (
          <ul className={styles.previews}>
            {previews.map((url, index) => (
              <li key={url} className={styles.preview}>
                {/* Object URLs are local blobs; next/image cannot optimise them. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeAt(index)}
                  aria-label={copy.photoRemove}
                >
                  <CloseIcon size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={descriptionId}>
          {copy.descriptionLabel}
        </label>
        <textarea
          id={descriptionId}
          name="description"
          className={styles.textarea}
          placeholder={copy.descriptionHint}
          maxLength={1200}
          disabled={!enabled}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={phoneId}>
          {copy.phoneFieldLabel}
        </label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={styles.input}
          placeholder="099 22 95 90"
          maxLength={32}
          disabled={!enabled}
        />
        <p className={styles.hint}>{copy.phoneFieldHint}</p>
      </div>

      {errorMessage ? (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" variant="solid" size="lg" disabled={!enabled || status === 'sending'}>
        {status === 'sending' ? copy.sending : copy.submit}
      </Button>

      <p className={styles.disclaimer}>{copy.disclaimer}</p>
    </form>
  );
}
