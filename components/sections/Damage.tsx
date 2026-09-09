import type { Dictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DamageSelector } from './DamageSelector';
import styles from './Damage.module.scss';

/**
 * Eight kinds of damage, indexed by where they land on a car, and one honest
 * note about what the method cannot do.
 */
export function Damage({ dict }: { dict: Dictionary }) {
  return (
    <Section labelledBy="damage-title">
      <SectionHeading
        label={dict.damage.label}
        title={dict.damage.title}
        lead={dict.damage.lead}
        id="damage-title"
        wide
      />

      <DamageSelector items={dict.damage.items} categories={dict.works.categories} />

      <p className={styles.note}>{dict.damage.note}</p>
    </Section>
  );
}
