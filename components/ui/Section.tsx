import type { ReactNode } from 'react';
import styles from './Section.module.scss';

/**
 * The shell every full-width block on the site shares: vertical rhythm, a
 * hairline underneath, and a centred container with fluid gutters.
 *
 * Sections that need a different inner layout — a two-column split, say — pass
 * their own grid class as `innerClassName` rather than redefining the shell.
 */
export function Section({
  children,
  id,
  labelledBy,
  label,
  raised,
  flush,
  innerClassName,
}: {
  children: ReactNode;
  id?: string;
  /** id of the heading that names this section. */
  labelledBy?: string;
  /** Use only where there is no visible heading to point at. */
  label?: string;
  /** Lift the surface off the page ground. */
  raised?: boolean;
  /** Drop the hairline, for a block that sits directly above another surface. */
  flush?: boolean;
  innerClassName?: string;
}) {
  const className = [styles.section, raised ? styles.raised : null, flush ? styles.flush : null]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={className} id={id} aria-labelledby={labelledBy} aria-label={label}>
      <div className={[styles.inner, innerClassName].filter(Boolean).join(' ')}>{children}</div>
    </section>
  );
}

export const sectionStyles = styles;
