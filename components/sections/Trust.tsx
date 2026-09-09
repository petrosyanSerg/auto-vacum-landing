import type { Dictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/ui/Section';
import styles from './Trust.module.scss';

/** Four findings, hairline-divided, no boxes. Every one is verifiable. */
export function Trust({ dict }: { dict: Dictionary }) {
  return (
    <Section labelledBy="trust-label">
      <h2 className={styles.label} id="trust-label">
        {dict.trust.label}
      </h2>

      <div className={styles.grid}>
        {dict.trust.items.map((item, index) => (
          <article
            key={item.title}
            className={styles.item}
            data-reveal
            style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
          >
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemBody}>{item.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
