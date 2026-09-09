'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { track } from '@/lib/analytics/events';
import styles from './BeforeAfter.module.scss';

export interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  /** Screen-reader name for the slider. */
  controlLabel: string;
  hint?: string;
  caption?: string;
  width: number;
  height: number;
  sizes: string;
  /** Set on the hero instance only — this is the largest paint on the page. */
  priority?: boolean;
}

/**
 * The comparison, and the site's one signature element.
 *
 * A native range input does all the work: it handles pointer drags, touch,
 * arrow keys, Home and End, and announces itself as a slider without any
 * custom key handling. It is laid transparently over the frame, so the visible
 * divider can be drawn as what a technician actually uses — a striped light
 * board stood on end.
 */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  controlLabel,
  hint,
  caption,
  width,
  height,
  sizes,
  priority,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const reported = useRef(false);

  const handleChange = (value: number) => {
    setPosition(value);
    if (!touched) setTouched(true);
    if (!reported.current) {
      reported.current = true;
      track('before_after_interaction');
    }
  };

  return (
    <figure className={styles.figure}>
      <div className={styles.frame} style={{ '--pos': `${position}%` } as React.CSSProperties}>
        <div className={styles.layer}>
          <Image
            src={afterSrc}
            alt={afterAlt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            quality={82}
          />
        </div>

        <div className={`${styles.layer} ${styles.before}`}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            quality={82}
          />
        </div>

        <span className={`${styles.tag} ${styles.tagBefore}`}>{beforeLabel}</span>
        <span className={`${styles.tag} ${styles.tagAfter}`}>{afterLabel}</span>

        {/* The scale the instrument reads against: ten divisions across the
            panel, with the current position called out in figures beside the
            handle. Both are decoration for a sighted reader — the range input
            announces the same value — so both stay out of the accessibility
            tree. */}
        <span className={styles.scale} aria-hidden>
          {Array.from({ length: 11 }, (_, index) => (
            <span key={index} className={styles.tick} data-major={index % 5 === 0 || undefined} />
          ))}
        </span>

        <span className={styles.readout} aria-hidden>
          {Math.round(position)}
        </span>

        <div className={styles.divider} aria-hidden>
          <span className={styles.beam} />
          <span className={styles.board}>
            <span className={styles.boardLine} />
            <span className={styles.boardLine} />
            <span className={styles.boardLine} />
          </span>
        </div>

        {hint ? (
          <span className={`${styles.hint} ${touched ? styles.hintHidden : ''}`}>{hint}</span>
        ) : null}

        <input
          type="range"
          className={styles.range}
          min={0}
          max={100}
          step={0.5}
          value={position}
          aria-label={controlLabel}
          aria-valuetext={`${Math.round(position)}% ${beforeLabel} / ${100 - Math.round(position)}% ${afterLabel}`}
          onChange={(event) => handleChange(Number(event.target.value))}
        />
      </div>

      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
