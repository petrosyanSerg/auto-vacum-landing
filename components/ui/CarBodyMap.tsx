'use client';

import { useState } from 'react';

import type { WorkCategory } from '@/content/translations/types';
import styles from './CarBodyMap.module.scss';

/**
 * The car, as a way of asking a question.
 *
 * A customer knows where the dent is long before they know what to call it, so
 * this lets them point at it. Every panel is a shortcut to one of the damage
 * types listed beside it, and hovering one names it before anything is clicked.
 *
 * The drawing carries no information the list of damage types does not already
 * carry in text, so it is hidden from assistive technology: the buttons beside
 * it are the real control, and this is the picture of that control.
 */

const VIEW_W = 900;
const VIEW_H = 330;

interface Zone {
  id: string;
  /** Which damage type this panel selects. */
  category: WorkCategory;
  d: string;
  /** Where the label for this panel is anchored, in view units. */
  tx: number;
  ty: number;
}

const ZONES: Zone[] = [
  { id: 'hood', category: 'hood', d: 'M170 176 L318 156 L318 180 L176 200 Z', tx: 244, ty: 168 },
  { id: 'roof', category: 'roof', d: 'M372 86 L596 80 L598 102 L380 108 Z', tx: 484, ty: 92 },
  {
    id: 'trunk',
    category: 'hail',
    d: 'M666 154 L800 168 L846 182 L840 204 L788 190 L670 178 Z',
    tx: 762,
    ty: 178,
  },
  {
    id: 'fender-front',
    category: 'fender',
    d: 'M176 200 L318 180 L318 262 L118 262 L118 216 Z',
    tx: 216,
    ty: 232,
  },
  { id: 'door-front', category: 'door', d: 'M318 178 L470 170 L470 262 L318 262 Z', tx: 394, ty: 218 },
  {
    id: 'door-rear',
    category: 'parking',
    d: 'M470 170 L612 164 L612 262 L470 262 Z',
    tx: 541,
    ty: 216,
  },
  {
    id: 'quarter',
    category: 'impact',
    d: 'M612 164 L668 172 L760 184 L800 262 L612 262 Z',
    tx: 692,
    ty: 224,
  },
];

/** Which panels a given damage type actually lands on. */
const AFFECTED: Record<WorkCategory, string[]> = {
  hail: ['hood', 'roof', 'trunk'],
  door: ['door-front', 'door-rear'],
  fender: ['fender-front', 'quarter'],
  hood: ['hood'],
  roof: ['roof'],
  parking: ['door-front', 'door-rear', 'quarter'],
  impact: ['door-rear'],
  restoration: ZONES.map((zone) => zone.id),
};

/** Hail lands on the panels that face the sky, and lands everywhere at once. */
const HAIL_DOTS = [
  [196, 186],
  [232, 180],
  [268, 174],
  [300, 168],
  [400, 96],
  [438, 94],
  [478, 92],
  [516, 90],
  [556, 88],
  [700, 168],
  [736, 174],
  [772, 180],
  [808, 188],
];

/** A single point of impact, on the panel the impact type highlights. */
const IMPACT_POINT = [541, 210] as const;

export function CarBodyMap({
  category,
  labels,
  onSelect,
}: {
  category: WorkCategory;
  /** Localised damage-type names, from `dict.works.categories`. */
  labels: Record<WorkCategory, string>;
  onSelect: (category: WorkCategory) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const affected = new Set(AFFECTED[category]);

  // With no pointer on the car — a phone, or a damage type picked from the
  // list — the first affected panel names itself, so the drawing still answers
  // "where does this happen".
  const named = hovered ?? AFFECTED[category][0] ?? null;

  return (
    <div className={styles.host} data-category={category}>
      <svg
        className={styles.car}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        aria-hidden
        focusable="false"
      >
        <defs>
          <linearGradient id="cbm-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2027" />
            <stop offset="100%" stopColor="#0c1015" />
          </linearGradient>
        </defs>

        {/* The silhouette. Everything else is drawn on top of this. */}
        <path
          className={styles.body}
          d="M118 262 L118 216 C120 200 138 192 160 188 L170 176 L318 156 L372 86 L596 80 L666 154 L800 168 L846 182 C864 190 872 206 870 226 L870 262 Z"
          fill="url(#cbm-body)"
          stroke="#39424d"
          strokeWidth="1.5"
        />

        {/* Glass, so the greenhouse reads as a greenhouse and the roof band
            above it reads as the roof. */}
        <path
          d="M386 108 L466 102 L466 152 L378 154 Z M486 100 L592 96 L640 150 L486 152 Z"
          fill="#0a0d11"
          stroke="#2b333d"
          strokeWidth="1"
        />

        {/* The line of light along the flank — the same read as everywhere else
            on the site, here just describing the shape of the car. */}
        <path
          className={styles.flank}
          d="M132 224 C 300 214, 560 210, 856 222"
          fill="none"
          stroke="#fff6e2"
          strokeWidth="1.2"
          opacity="0.28"
        />

        {ZONES.map((zone) => (
          <path
            key={zone.id}
            className={styles.zone}
            d={zone.d}
            data-affected={affected.has(zone.id) || undefined}
            onClick={() => onSelect(zone.category)}
            onPointerEnter={() => setHovered(zone.id)}
            onPointerLeave={() => setHovered((current) => (current === zone.id ? null : current))}
          />
        ))}

        {/* Wheels, over the panels so the arches read correctly. */}
        <g className={styles.wheels}>
          <circle cx="255" cy="262" r="52" fill="#07090b" stroke="#39424d" strokeWidth="1.5" />
          <circle cx="255" cy="262" r="24" fill="none" stroke="#2b333d" strokeWidth="1.5" />
          <circle cx="676" cy="262" r="52" fill="#07090b" stroke="#39424d" strokeWidth="1.5" />
          <circle cx="676" cy="262" r="24" fill="none" stroke="#2b333d" strokeWidth="1.5" />
        </g>

        <g className={styles.hail}>
          {HAIL_DOTS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" fill="#e23a22" />
          ))}
        </g>

        <g className={styles.impact}>
          <circle
            cx={IMPACT_POINT[0]}
            cy={IMPACT_POINT[1]}
            r="18"
            fill="none"
            stroke="#e23a22"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <circle cx={IMPACT_POINT[0]} cy={IMPACT_POINT[1]} r="4" fill="#e23a22" />
        </g>
      </svg>

      {/* One label per panel, placed over the drawing. Only the panel under the
          pointer shows its own; the selected damage type keeps its panels lit
          underneath. */}
      {ZONES.map((zone) => (
        <span
          key={zone.id}
          className={styles.tip}
          data-show={zone.id === named || undefined}
          style={{
            left: `${(zone.tx / VIEW_W) * 100}%`,
            top: `${(zone.ty / VIEW_H) * 100}%`,
          }}
        >
          {labels[zone.category]}
        </span>
      ))}
    </div>
  );
}
