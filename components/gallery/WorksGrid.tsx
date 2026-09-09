'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { workCategories, workImagePath, type WorkItem } from '@/content/works';
import { videoWatchUrl } from '@/content/videos';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import type { WorkCategory } from '@/content/translations/types';
import { track } from '@/lib/analytics/events';
import { PlayIcon } from '@/components/ui/Icons';
import styles from './WorksGrid.module.scss';

/**
 * The portfolio wall.
 *
 * Every tile links to the clip the frame was taken from, so a visitor can go
 * and check the claim rather than take the still on trust. Each tile is
 * labelled with what it actually shows — damage, finished, or mid-job — since
 * only one job on the channel supports a true paired comparison.
 */
export function WorksGrid({
  items,
  dict,
  filterable = false,
  showSourceNote = true,
}: {
  items: WorkItem[];
  dict: Dictionary;
  filterable?: boolean;
  showSourceNote?: boolean;
}) {
  const [active, setActive] = useState<WorkCategory | 'all'>('all');

  const available = useMemo(
    () => workCategories.filter((c) => items.some((i) => i.category === c)),
    [items],
  );

  const visible = useMemo(
    () => (active === 'all' ? items : items.filter((i) => i.category === active)),
    [items, active],
  );

  const stateClass = {
    before: styles.stateBefore,
    after: styles.stateAfter,
    process: styles.stateProcess,
  } as const;

  return (
    <div>
      {filterable ? (
        <div className={styles.filters}>
          <span className={styles.filterLabel} id="works-filter-label">
            {dict.common.filterLabel}
          </span>
          <button
            type="button"
            className={styles.filter}
            aria-pressed={active === 'all'}
            onClick={() => setActive('all')}
          >
            {dict.common.all}
          </button>
          {available.map((category) => (
            <button
              key={category}
              type="button"
              className={styles.filter}
              aria-pressed={active === category}
              onClick={() => {
                setActive(category);
                track('work_filter', { category });
              }}
            >
              {dict.works.categories[category]}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className={styles.empty}>{dict.works.empty}</p>
      ) : (
        <ul className={styles.grid} aria-labelledby={filterable ? 'works-filter-label' : undefined}>
          {visible.map((item, index) => {
            const copy = dict.works.items[item.id];
            return (
              <li
                key={item.id}
                className={item.feature ? styles.feature : undefined}
                data-reveal
                style={{ '--reveal-delay': `${Math.min(index, 6) * 60}ms` } as React.CSSProperties}
              >
                <a
                  href={videoWatchUrl(item.video)}
                  className={`${styles.tile} ${item.feature ? styles.feature : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="youtube_click"
                >
                  <Image
                    src={workImagePath(item)}
                    alt={copy?.title ?? ''}
                    width={item.width}
                    height={item.height}
                    sizes={
                      item.feature
                        ? '(min-width: 1200px) 46vw, (min-width: 720px) 62vw, 46vw'
                        : '(min-width: 1200px) 23vw, (min-width: 720px) 31vw, 46vw'
                    }
                    quality={75}
                  />
                  <span className={styles.scrim} />

                  <span className={`${styles.state} ${stateClass[item.state]}`}>
                    {dict.common.damageState[item.state]}
                  </span>

                  <span className={styles.caption}>
                    <span className={styles.tileTitle}>{copy?.title}</span>
                    <span className={styles.tileNote}>{copy?.note}</span>
                    <span className={styles.watch}>
                      <PlayIcon size={13} />
                      {dict.common.watchOnYoutube}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {showSourceNote ? <p className={styles.source}>{dict.common.sourceNote}</p> : null}
    </div>
  );
}
