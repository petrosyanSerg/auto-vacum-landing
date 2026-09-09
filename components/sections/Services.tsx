import Image from 'next/image';
import Link from 'next/link';

import { localePath, type Locale } from '@/lib/i18n/config';
import { routePath, servicePath } from '@/lib/i18n/routes';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { serviceImage, serviceSlugs } from '@/content/services';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icons';
import styles from './Services.module.scss';

/**
 * Four cards, each linking to a page that can rank on its own terms. The
 * thumbnails are frames of the workshop's real work, not stock photography.
 */
export function Services({
  locale,
  dict,
  showAllLink = true,
}: {
  locale: Locale;
  dict: Dictionary;
  showAllLink?: boolean;
}) {
  return (
    <Section labelledBy="services-title">
      <div className={styles.head}>
        <SectionHeading
          label={dict.servicesSection.label}
          title={dict.servicesSection.title}
          lead={dict.servicesSection.lead}
          id="services-title"
        />
        {showAllLink ? (
          <ButtonLink href={localePath(locale, routePath.services)} variant="outline">
            {dict.servicesSection.allCta}
            <ArrowIcon size={17} />
          </ButtonLink>
        ) : null}
      </div>

      <div className={styles.grid}>
        {serviceSlugs.map((slug, index) => {
          const service = dict.services[slug];
          return (
            <Link
              key={slug}
              href={localePath(locale, servicePath(slug))}
              className={styles.card}
              data-reveal
              style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
            >
              <div className={styles.thumb}>
                <Image
                  src={`/images/works/${serviceImage[slug]}.webp`}
                  alt=""
                  width={1000}
                  height={1250}
                  sizes="(min-width: 1200px) 22vw, (min-width: 720px) 45vw, 92vw"
                  quality={75}
                />
              </div>

              <div className={styles.body}>
                <h3 className={styles.title}>{service.name}</h3>
                <p className={styles.summary}>{service.summary}</p>
              </div>

              <span className={styles.more}>
                {dict.servicesSection.cardCta}
                <ArrowIcon size={15} className={styles.arrow} />
              </span>
            </Link>
          );
        })}
      </div>

      <p className={styles.note}>{dict.damage.note}</p>
    </Section>
  );
}
