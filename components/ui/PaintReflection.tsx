'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './PaintReflection.module.scss';

/**
 * Workshop lighting on a painted panel.
 *
 * A body shop reads paint by moving a lamp across it, not by standing still.
 * This gives the visitor the same instrument: the pointer is the lamp, and a
 * soft band of light travels over the photograph with it while the frame tips
 * a degree or so toward the cursor.
 *
 * It writes two custom properties and nothing else — no React state, so no
 * re-render — and the values are applied once per animation frame. On a touch
 * screen, on a coarse pointer, or under reduced motion the effect is never
 * armed and this renders as a plain wrapper.
 */
export function PaintReflection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || still.matches) return;

    let frame = 0;
    let x = 0.5;
    let y = 0.5;

    const paint = () => {
      frame = 0;
      host.style.setProperty('--px', x.toFixed(4));
      host.style.setProperty('--py', y.toFixed(4));
    };

    const onMove = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return;
      x = (event.clientX - box.left) / box.width;
      y = (event.clientY - box.top) / box.height;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // Leaving returns the lamp to centre rather than freezing it mid-panel.
    const onLeave = () => {
      x = 0.5;
      y = 0.5;
      if (!frame) frame = requestAnimationFrame(paint);
      host.removeAttribute('data-lit');
    };

    const onEnter = () => host.setAttribute('data-lit', '');

    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.setAttribute('data-armed', '');

    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeAttribute('data-armed');
      host.removeAttribute('data-lit');
    };
  }, []);

  return (
    <div ref={hostRef} className={[styles.host, className].filter(Boolean).join(' ')}>
      <div className={styles.tilt}>{children}</div>
      <span className={styles.sheen} aria-hidden />
    </div>
  );
}
