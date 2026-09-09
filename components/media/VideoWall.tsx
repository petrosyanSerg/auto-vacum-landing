'use client';

import Image from 'next/image';
import { useState } from 'react';

import { videoEmbedUrl, videoPoster, videos, VIDEO_POSTER_SIZE } from '@/content/videos';
import type { VideoWallCopy } from './VideoWall.copy';
import { track } from '@/lib/analytics/events';
import { PlayIcon } from '@/components/ui/Icons';
import styles from './VideoWall.module.scss';

/**
 * Posters are local WebP stills, so this wall costs nine small images and no
 * third-party JavaScript. A YouTube player is only inserted into the cell the
 * visitor actually presses, and only through the no-cookie host.
 */
export function VideoWall({ copy }: { copy: VideoWallCopy }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul className={styles.grid}>
      {videos.map((video, index) => {
        const title = copy.titles[video.id] ?? copy.fallbackTitle;
        const isPlaying = playing === video.id;

        return (
          <li
            key={video.id}
            className={styles.cell}
            data-reveal
            style={{ '--reveal-delay': `${Math.min(index, 5) * 60}ms` } as React.CSSProperties}
          >
            {isPlaying ? (
              <iframe
                className={styles.frame}
                src={videoEmbedUrl(video.id)}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button
                type="button"
                className={styles.trigger}
                onClick={() => {
                  setPlaying(video.id);
                  track('video_play', { video: video.id });
                }}
                aria-label={`${copy.playVideo}: ${title}`}
              >
                <Image
                  src={videoPoster(video.id)}
                  alt=""
                  width={VIDEO_POSTER_SIZE.width}
                  height={VIDEO_POSTER_SIZE.height}
                  sizes="(min-width: 1200px) 19vw, (min-width: 720px) 31vw, 46vw"
                  quality={72}
                  loading="lazy"
                />
                <span className={styles.scrim} />
                <span className={styles.play}>
                  <PlayIcon size={20} />
                </span>
                <span className={styles.caption}>{title}</span>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
