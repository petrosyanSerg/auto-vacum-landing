import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { ADDRESS, MAPS, PHONE_DISPLAY, PHONE_TEL_HREF } from '@/config/business';
import { heroComparison, workImagePath } from '@/content/works';
import { BeforeAfter } from '@/components/gallery/BeforeAfter';
import { ButtonLink } from '@/components/ui/Button';
import { CallButton } from '@/components/ui/CallButton';
import { BeamField } from '@/components/ui/BeamField';
import { PaintReflection } from '@/components/ui/PaintReflection';
import { ArrowIcon, PinIcon } from '@/components/ui/Icons';
import styles from './Hero.module.scss';

/**
 * What we do, why it is better, where we are, and how to call — above the fold
 * in every language. The comparison carries the proof; the rail underneath
 * carries the facts.
 */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const before = dict.works.items[heroComparison?.before.id ?? ''];
  const after = dict.works.items[heroComparison?.after.id ?? ''];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <BeamField className={styles.field} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{dict.hero.eyebrow}</p>

          <h1 className={styles.title} id="hero-title">
            {dict.hero.h1}
          </h1>

          <p className={styles.lead}>{dict.hero.lead}</p>

          <div className={styles.actions}>
            <CallButton label={dict.hero.primaryCta} ariaLabel={dict.common.callAria} size="lg" />
            <ButtonLink href={MAPS.googleDirections} variant="outline" size="lg" track="directions_click">
              <PinIcon size={18} />
              {dict.hero.secondaryCta}
            </ButtonLink>
          </div>

          <p className={styles.where}>
            <PinIcon size={15} />
            {dict.hero.locationLine}
          </p>

          <a className={styles.cue} href="#proof">
            <span className={styles.cueLine} aria-hidden />
            {dict.hero.scrollCue}
            <ArrowIcon size={14} />
          </a>
        </div>

        <div className={styles.visual}>
          {heroComparison ? (
            <PaintReflection>
              <BeforeAfter
                beforeSrc={workImagePath(heroComparison.before)}
                afterSrc={workImagePath(heroComparison.after)}
                beforeAlt={before?.title ?? dict.common.before}
                afterAlt={after?.title ?? dict.common.after}
                beforeLabel={dict.common.before}
                afterLabel={dict.common.after}
                controlLabel={dict.hero.comparisonLabel}
                hint={dict.hero.dragHint}
                caption={dict.hero.comparisonCaption}
                width={heroComparison.after.width}
                height={heroComparison.after.height}
                sizes="(min-width: 1200px) 46vw, (min-width: 960px) 48vw, 100vw"
                priority
              />
            </PaintReflection>
          ) : null}
        </div>
      </div>

      <div className={styles.rail}>
        <div className={styles.railInner}>
          <div className={styles.railCell}>
            <span className={styles.railLabel}>{dict.servicesSection.label}</span>
            <span className={styles.railValue}>{dict.services.pdr.summary}</span>
          </div>

          <div className={styles.railCell}>
            <span className={styles.railLabel}>{dict.common.address}</span>
            <a
              className={styles.railValue}
              href={MAPS.googleDirections}
              target="_blank"
              rel="noopener noreferrer"
              data-track="map_click"
            >
              {ADDRESS.streetAddress[locale]}, {ADDRESS.addressLocality[locale]}
            </a>
          </div>

          <div className={styles.railCell}>
            <span className={styles.railLabel}>{dict.common.phoneLabel}</span>
            <a
              className={styles.railPhone}
              href={PHONE_TEL_HREF}
              aria-label={dict.common.callAria}
              data-track="phone_click"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
