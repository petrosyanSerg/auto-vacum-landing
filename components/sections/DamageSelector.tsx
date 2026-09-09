'use client';

import { useState } from 'react';

import type { TitledBody, WorkCategory } from '@/content/translations/types';
import { CarBodyMap } from '@/components/ui/CarBodyMap';
import styles from './Damage.module.scss';

/**
 * Find your dent on the car.
 *
 * The eight damage types are the same eight the copy has always listed, in the
 * same order; what is new is that they are now indexed by the panel they land
 * on. Someone who cannot name their damage can point at the door instead, and
 * someone who can name it sees where on the body it usually appears.
 *
 * The buttons are the control and carry every title in plain text. The car is
 * a second way to reach the same buttons and is hidden from assistive
 * technology, so nothing here is only available by pointing at a picture.
 */

/**
 * The order the damage list is written in, matched to the panel vocabulary the
 * portfolio filters by. Both lists are fixed by the translation contract, so
 * this pairing is checked at build time rather than assumed.
 */
const CATEGORY_ORDER: WorkCategory[] = [
  'hail',
  'door',
  'fender',
  'hood',
  'roof',
  'parking',
  'impact',
  'restoration',
];

export function DamageSelector({
  items,
  categories,
}: {
  /** `dict.damage.items`, in the order above. */
  items: TitledBody[];
  /** `dict.works.categories` — the short panel names used on the car. */
  categories: Record<WorkCategory, string>;
}) {
  const [active, setActive] = useState(0);

  const selectCategory = (category: WorkCategory) => {
    const index = CATEGORY_ORDER.indexOf(category);
    if (index >= 0 && index < items.length) setActive(index);
  };

  const current = items[active];

  return (
    <div className={styles.selector}>
      <div className={styles.map} data-reveal>
        <CarBodyMap
          category={CATEGORY_ORDER[active] ?? 'hail'}
          labels={categories}
          onSelect={selectCategory}
        />
      </div>

      <div className={styles.picker} data-reveal>
        <div className={styles.chips}>
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={styles.chip}
              aria-pressed={index === active}
              aria-controls="damage-readout"
              onClick={() => setActive(index)}
            >
              <span className={styles.dot} aria-hidden />
              {item.title}
            </button>
          ))}
        </div>

        <div className={styles.readout} id="damage-readout" aria-live="polite">
          <h3 className={styles.readoutTitle}>{current?.title}</h3>
          <p className={styles.readoutBody}>{current?.body}</p>
        </div>
      </div>
    </div>
  );
}
