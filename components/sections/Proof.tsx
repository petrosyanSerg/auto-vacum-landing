import { localePath, type Locale } from '@/lib/i18n/config';
import { routePath } from '@/lib/i18n/routes';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { works } from '@/content/works';
import { Section, sectionStyles } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icons';
import { WorksGrid } from '@/components/gallery/WorksGrid';
import { worksGridCopy } from '@/components/gallery/WorksGrid.copy';
import styles from './Proof.module.scss';

/**
 * The diagnostic rule, drawn: a straight line over a flat panel and a bent one
 * over a dent. It is why every photograph on this site is worth reading, so it
 * is stated once, plainly, before the wall of work.
 */
function ReflectionRule({ note }: { note: string }) {
  return (
    <div className={styles.rule} data-reveal>
      <svg
        className={styles.ruleDiagram}
        viewBox="0 0 240 92"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
        focusable="false"
      >
        <path d="M12 26h216" opacity="0.9" />
        <path
          d="M12 66h72c16 0 20 16 36 16s20-16 36-16h72"
          opacity="0.9"
          stroke="var(--marker-lift)"
        />
      </svg>
      <p className={styles.ruleNote}>{note}</p>
    </div>
  );
}

/** Homepage proof block: the rule, then a preview of the real work. */
export function Proof({
  locale,
  dict,
  limit = 7,
}: {
  locale: Locale;
  dict: Dictionary;
  limit?: number;
}) {
  const shown = works.slice(0, limit);

  return (
    <Section id="proof" labelledBy="proof-title">
      <div className={styles.head}>
        <SectionHeading
          label={dict.proof.label}
          title={dict.proof.title}
          lead={dict.proof.lead}
          id="proof-title"
          wide
        />
        <ReflectionRule note={dict.proof.lineNote} />
      </div>

      <WorksGrid items={shown} copy={worksGridCopy(dict, shown)} showSourceNote={false} />

      <div className={sectionStyles.foot}>
        <ButtonLink href={localePath(locale, routePath.works)} variant="outline">
          {dict.works.allCta}
          <ArrowIcon size={17} />
        </ButtonLink>
      </div>
    </Section>
  );
}
