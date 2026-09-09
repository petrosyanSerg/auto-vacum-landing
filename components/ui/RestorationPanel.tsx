'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './RestorationPanel.module.scss';

/**
 * The job, drawn as an instrument reading rather than as a picture of a car.
 *
 * A technician does not look at a dent; they look at what a straight line of
 * light does when it crosses one. This panel shows exactly that: nine lines of
 * light lying across a body panel, buckled around a dent at the start and
 * straight at the end, with the five stages of a real job in between.
 *
 * All three sets of lines — deep, part-worked and flat — are drawn once on the
 * server and then cross-faded by opacity alone, so the metal appears to settle
 * without a single geometry recalculation at runtime. There is no animation
 * loop here and nothing to throttle: the only work the browser does is fade
 * three groups, on the compositor.
 */

const VIEW_W = 640;
const VIEW_H = 380;

const ROWS = [56, 92, 128, 164, 200, 236, 272, 308, 344];

/** The dent: centre, how far up and down the panel the bend reaches, depth. */
const DENT_X = 296;
const DENT_Y = 200;
const DENT_SPREAD = 78;
const MAX_AMPLITUDE = 27;

/**
 * One line of light at height `y`, bent by `amount` of the dent.
 *
 * The bend falls off with distance from the dent centre — the row crossing the
 * deepest point moves most — and leaves a small crown on the way out, which is
 * the shape a pushed panel actually takes.
 */
function beamPath(y: number, amount: number): string {
  const falloff = Math.exp(-((y - DENT_Y) ** 2) / (2 * DENT_SPREAD ** 2));
  const amp = MAX_AMPLITUDE * amount * falloff;
  if (amp < 0.35) return `M0 ${y} H${VIEW_W}`;

  const left = DENT_X - 118;
  const right = DENT_X + 118;
  return [
    `M0 ${y}`,
    `L${left} ${y}`,
    `C${left + 48} ${y} ${DENT_X - 44} ${y + amp} ${DENT_X} ${y + amp}`,
    `C${DENT_X + 44} ${y + amp} ${right - 40} ${y - amp * 0.4} ${right} ${y}`,
    `L${VIEW_W} ${y}`,
  ].join(' ');
}

/** The three states of the metal, drawn once at module load. */
const SURFACES = [1, 0.3, 0].map((amount) => ROWS.map((y) => beamPath(y, amount)));

/**
 * The five stages, in the order the process copy lists them.
 *
 * `surface` is which set of lines is showing, `depth` is what a gauge would
 * read on the deepest point at that stage, `hold` is how long the stage runs
 * before the diagram moves itself on, and the two flags say whether the dent is
 * circled and whether the rod is behind the panel.
 */
const STAGES = [
  { surface: 0, depth: '1.8', hold: 2600, marked: false, tool: false },
  { surface: 0, depth: '1.8', hold: 2400, marked: true, tool: false },
  { surface: 0, depth: '1.8', hold: 2600, marked: true, tool: true },
  { surface: 1, depth: '0.5', hold: 3000, marked: true, tool: true },
  { surface: 2, depth: '0.0', hold: 4000, marked: false, tool: false },
] as const;

export function RestorationPanel({
  stageNames,
  stage,
  onStageChange,
}: {
  /** Localised stage names, from `dict.process.steps`. */
  stageNames: string[];
  stage: number;
  onStageChange: (stage: number) => void;
}) {
  const [inView, setInView] = useState(false);
  /** Set once the visitor picks a stage: the diagram then stops driving itself. */
  const [manual, setManual] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  const current = STAGES[stage] ?? STAGES[0];

  // Nothing moves until the diagram is actually on screen.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.3 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  // The diagram walks itself through the five stages while it is on screen and
  // the visitor has not taken over. It stops at the last stage rather than
  // looping, so nothing on the page moves forever. Under reduced motion it
  // never starts, and the panel simply sits at the stage it is set to.
  useEffect(() => {
    if (!inView || manual) return;
    if (stage >= STAGES.length - 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => onStageChange(stage + 1), current.hold);
    return () => window.clearTimeout(timer);
  }, [inView, manual, stage, current.hold, onStageChange]);

  const pick = (next: number) => {
    setManual(true);
    onStageChange(next);
  };

  return (
    <div className={styles.host} ref={hostRef} data-stage={stage}>
      <div className={styles.frame}>
        <svg
          className={styles.panel}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
          focusable="false"
        >
          <defs>
            {/* The panel itself: painted metal, lit from the upper left. */}
            <linearGradient id="rp-body" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0%" stopColor="#1b2129" />
              <stop offset="55%" stopColor="#12171d" />
              <stop offset="100%" stopColor="#0a0d11" />
            </linearGradient>
            {/* Lines of light fall off toward the panel edges, as they do on a
                real panel where the surface curves away from the lamp. */}
            <linearGradient id="rp-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff6e2" stopOpacity="0.05" />
              <stop offset="18%" stopColor="#fff6e2" stopOpacity="0.5" />
              <stop offset="82%" stopColor="#fff6e2" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fff6e2" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="rp-scan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff6e2" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff6e2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff6e2" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width={VIEW_W} height={VIEW_H} fill="url(#rp-body)" />

          {/* The character line every body panel is pressed with. */}
          <path
            d={`M0 ${VIEW_H - 46} C 160 ${VIEW_H - 58}, 470 ${VIEW_H - 58}, ${VIEW_W} ${VIEW_H - 46}`}
            fill="none"
            stroke="#39424d"
            strokeWidth="1"
            opacity="0.5"
          />

          {SURFACES.map((surface, index) => (
            <g
              key={index}
              className={styles.surface}
              style={{ opacity: index === current.surface ? 1 : 0 }}
              fill="none"
              stroke="url(#rp-beam)"
              strokeWidth="1.4"
            >
              {surface.map((d, row) => (
                <path key={ROWS[row]} d={d} />
              ))}
            </g>
          ))}

          {/* The dent found and circled, the way it is marked on a real panel
              before the work starts. */}
          <g className={styles.marker} style={{ opacity: current.marked ? 1 : 0 }}>
            <circle
              cx={DENT_X}
              cy={DENT_Y}
              r="62"
              fill="none"
              stroke="#e23a22"
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
            <line
              x1={DENT_X - 78}
              y1={DENT_Y}
              x2={DENT_X - 66}
              y2={DENT_Y}
              stroke="#e23a22"
              strokeWidth="1.5"
            />
            <line
              x1={DENT_X + 66}
              y1={DENT_Y}
              x2={DENT_X + 78}
              y2={DENT_Y}
              stroke="#e23a22"
              strokeWidth="1.5"
            />
          </g>

          {/* Reaching the back of the panel: the rod comes in from behind and
              stops under the deepest point. */}
          <g
            className={styles.tool}
            style={{
              opacity: current.tool ? 1 : 0,
              translate: current.tool ? '0 0' : '46% 22%',
            }}
          >
            <line
              x1={VIEW_W + 40}
              y1={DENT_Y + 96}
              x2={DENT_X + 26}
              y2={DENT_Y + 14}
              stroke="#7d8794"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={DENT_X} cy={DENT_Y} r="11" fill="none" stroke="#eef2f5" strokeWidth="2" />
            <circle cx={DENT_X} cy={DENT_Y} r="3" fill="#eef2f5" />
          </g>

          {/* The inspection light on the first stage, and the clean pass over
              the finished panel on the last. */}
          <rect
            className={styles.scan}
            x="-70"
            y="0"
            width="70"
            height={VIEW_H}
            fill="url(#rp-scan)"
          />
        </svg>

        {/* The instrument reading. The stage number and the depth are the only
            figures here, and both simply describe the diagram beside them. */}
        <div className={styles.hud}>
          <span className={styles.hudStage}>{String(stage + 1).padStart(2, '0')}</span>
          <span className={styles.hudName}>{stageNames[stage]}</span>
          <span className={styles.hudDepth} data-flat={current.depth === '0.0' || undefined}>
            {current.depth}
            <span className={styles.hudUnit}>mm</span>
          </span>
        </div>
      </div>

      {/* The five stages, as controls. This is also the whole mobile story:
          the diagram plays itself, and tapping a number jumps to that stage. */}
      <div className={styles.rail}>
        {stageNames.map((name, index) => (
          <button
            key={name}
            type="button"
            className={styles.railStep}
            aria-pressed={index === stage}
            aria-label={`${String(index + 1).padStart(2, '0')} — ${name}`}
            onClick={() => pick(index)}
            onMouseEnter={() => pick(index)}
            onFocus={() => pick(index)}
          >
            <span className={styles.railNum}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.railTick} aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}
