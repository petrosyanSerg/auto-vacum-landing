import type { Dictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessDiagram } from './ProcessDiagram';
import styles from './Process.module.scss';

/**
 * How a job runs, shown twice over: once as a panel with a dent in it that is
 * inspected, marked, reached, worked and checked, and once as the five written
 * steps underneath. The diagram is the only interactive part; the words are
 * plain server-rendered prose and read fine on their own.
 */
export function Process({ dict }: { dict: Dictionary }) {
  return (
    <Section labelledBy="process-title">
      <SectionHeading
        label={dict.process.label}
        title={dict.process.title}
        lead={dict.process.lead}
        id="process-title"
        wide
      />

      <ProcessDiagram steps={dict.process.steps} />

      <p className={styles.note}>{dict.process.note}</p>
    </Section>
  );
}
