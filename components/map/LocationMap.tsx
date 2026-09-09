'use client';

import { useState } from 'react';

import { MAP_PROVIDER, MAPS } from '@/config/business';
import { track } from '@/lib/analytics/events';
import { PinIcon } from '@/components/ui/Icons';
import styles from './LocationMap.module.scss';

/**
 * Click-to-load map.
 *
 * Until the visitor asks for it, nothing is requested from Google or Yandex —
 * no iframe, no cookie, no ~800 KB of tiles competing with the images that
 * actually sell the work. The provider comes from configuration, so switching
 * to Yandex for the Russian-speaking market is one environment variable.
 */
export function LocationMap({
  title,
  cta,
  note,
  providerName,
}: {
  title: string;
  cta: string;
  note: string;
  providerName: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const src = MAP_PROVIDER === 'yandex' ? MAPS.yandexEmbed : MAPS.googleEmbed;

  return (
    <div className={styles.frame}>
      {loaded ? (
        <iframe
          className={styles.embed}
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className={styles.placeholder}
          onClick={() => {
            setLoaded(true);
            track('map_click', { provider: MAP_PROVIDER });
          }}
        >
          <span className={styles.grid} aria-hidden />
          <span className={styles.content}>
            <span className={styles.pin}>
              <PinIcon size={22} />
            </span>
            <span className={styles.cta}>
              {cta} · {providerName}
            </span>
            <span className={styles.note}>{note}</span>
          </span>
        </button>
      )}
    </div>
  );
}
