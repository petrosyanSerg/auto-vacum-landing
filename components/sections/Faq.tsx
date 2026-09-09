import type { QA } from '@/content/translations/types';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CallButton } from '@/components/ui/CallButton';
import styles from './Faq.module.scss';

/**
 * Built on <details>, so the accordion is keyboard operable, announced
 * correctly, and findable with in-page search without any JavaScript.
 */
export function FaqList({ items }: { items: QA[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.question}>
            {item.q}
            <span className={styles.sign} aria-hidden />
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq({ dict, items }: { dict: Dictionary; items?: QA[] }) {
  return (
    <Section labelledBy="faq-title" innerClassName={styles.split}>
      <div className={styles.aside}>
        <SectionHeading
          label={dict.faq.label}
          title={dict.faq.title}
          lead={dict.faq.lead}
          id="faq-title"
        />
        <CallButton label={dict.common.callWithNumber} ariaLabel={dict.common.callAria} size="md" />
      </div>

      <FaqList items={items ?? dict.faq.items} />
    </Section>
  );
}
