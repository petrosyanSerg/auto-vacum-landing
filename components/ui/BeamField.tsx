import styles from './BeamField.module.scss';

/**
 * The thesis, drawn.
 *
 * Eight lines of light lying across a panel. In the first group they bend
 * around a dent; in the second they run straight. On load the bent set fades
 * out and the straight set fades in — the entire job, stated once, before a
 * word of copy is read. Reduced-motion visitors get the straight set only.
 *
 * Rendered on the server as static markup: no library, no runtime cost.
 */

const VIEW_W = 1200;
const VIEW_H = 700;
const ROWS = [70, 150, 230, 310, 390, 470, 550, 630];

/** Dent centre, and how far the bend reaches up and down the panel. */
const DENT_X = 690;
const DENT_Y = 350;
const DENT_SPREAD = 210;
const MAX_AMPLITUDE = 34;

function bentPath(y: number): string {
  // Amplitude falls off with distance from the dent centre, the way a real
  // reflection distorts most on the row that crosses the deepest point.
  const falloff = Math.exp(-((y - DENT_Y) ** 2) / (2 * DENT_SPREAD ** 2));
  const amp = MAX_AMPLITUDE * falloff;
  if (amp < 0.6) return `M0 ${y} H${VIEW_W}`;

  const left = DENT_X - 150;
  const right = DENT_X + 150;
  // Down into the dent, then a smaller crown on the way out — the shape a
  // pushed panel actually takes.
  return [
    `M0 ${y}`,
    `L${left} ${y}`,
    `C${left + 60} ${y} ${DENT_X - 55} ${y + amp} ${DENT_X} ${y + amp}`,
    `C${DENT_X + 55} ${y + amp} ${right - 50} ${y - amp * 0.42} ${right} ${y}`,
    `L${VIEW_W} ${y}`,
  ].join(' ');
}

export function BeamField({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.field, className].filter(Boolean).join(' ')}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      focusable="false"
    >
      <g className={styles.bent} fill="none" stroke="currentColor" strokeWidth="1.25">
        {ROWS.map((y) => (
          <path key={y} d={bentPath(y)} />
        ))}
      </g>
      <g className={styles.straight} fill="none" stroke="currentColor" strokeWidth="1.25">
        {ROWS.map((y) => (
          <path key={y} d={`M0 ${y} H${VIEW_W}`} />
        ))}
      </g>
    </svg>
  );
}
