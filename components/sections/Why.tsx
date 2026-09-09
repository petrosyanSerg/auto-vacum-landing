import type { Dictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import styles from './Why.module.scss';

/**
 * The case for keeping the paint. Every claim here is hedged the way the
 * workshop hedges it on the phone: "usually", "when suitable", never "always".
 */
export function Why({ dict }: { dict: Dictionary }) {
  return (
    <Section labelledBy="why-title" raised innerClassName={styles.split}>
      <SectionHeading
        label={dict.why.label}
        title={dict.why.title}
        lead={dict.why.lead}
        id="why-title"
      />

      <div className={styles.points}>
        {dict.why.points.map((point, index) => (
          <article
            key={point.title}
            className={styles.point}
            data-reveal
            style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
          >
            <h3 className={styles.pointTitle}>{point.title}</h3>
            <p className={styles.pointBody}>{point.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
