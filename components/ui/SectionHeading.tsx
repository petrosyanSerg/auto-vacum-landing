import type { ReactNode } from 'react';
import styles from './SectionHeading.module.scss';

/**
 * Label, title, lead. The label is set in the technical face and prefixed with
 * a short segment of the light line, which is what marks a section boundary
 * across the whole site.
 */
export function SectionHeading({
  label,
  title,
  lead,
  id,
  level = 2,
  centred,
  wide,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  id?: string;
  level?: 1 | 2;
  centred?: boolean;
  wide?: boolean;
  children?: ReactNode;
}) {
  const Title = level === 1 ? 'h1' : 'h2';

  return (
    <div
      className={[styles.heading, centred ? styles.centred : null, wide ? styles.wide : null]
        .filter(Boolean)
        .join(' ')}
      data-reveal
    >
      <p className={styles.label}>{label}</p>
      <Title className={styles.title} id={id}>
        {title}
      </Title>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
      {children}
    </div>
  );
}
