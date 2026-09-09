import type { Metadata } from 'next';

import { resolveLocaleMeta, resolveLocalePage, type LocaleParams } from '@/lib/i18n/page';
import { buildMetadata } from '@/lib/seo/metadata';
import { routePath } from '@/lib/i18n/routes';
import { faqSchema, videoListSchema, webPageSchema } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/JsonLd';

import { Hero } from '@/components/sections/Hero';
import { Trust } from '@/components/sections/Trust';
import { Services } from '@/components/sections/Services';
import { Proof } from '@/components/sections/Proof';
import { Videos } from '@/components/sections/Videos';
import { Process } from '@/components/sections/Process';
import { Why } from '@/components/sections/Why';
import { Damage } from '@/components/sections/Damage';
import { Faq } from '@/components/sections/Faq';
import { Location } from '@/components/sections/Location';
import { FinalCta } from '@/components/sections/FinalCta';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const resolved = await resolveLocaleMeta(params);
  if (!resolved) return {};
  const { locale, dict } = resolved;

  return buildMetadata({
    locale,
    path: routePath.home,
    title: `${dict.hero.h1} — ${dict.meta.siteName}`,
    description: dict.meta.defaultDescription,
  });
}

/**
 * The homepage tells one story in order: here is the problem and what it looks
 * like solved (hero), why you can believe it (trust), what we do (services),
 * the actual work (proof and video), how a job runs (process), why paint
 * matters (why), what we take on (damage), the questions everyone asks (FAQ),
 * where we are (location), and the number (CTA).
 */
export default async function HomePage({ params }: { params: LocaleParams }) {
  const { locale, dict } = await resolveLocalePage(params);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Trust dict={dict} />
      <Services locale={locale} dict={dict} />
      <Proof locale={locale} dict={dict} />
      <Videos dict={dict} />
      <Process dict={dict} />
      <Why dict={dict} />
      <Damage dict={dict} />
      <Faq dict={dict} />
      <Location locale={locale} dict={dict} />
      <FinalCta locale={locale} dict={dict} />

      <JsonLd
        data={[
          webPageSchema({
            locale,
            path: routePath.home,
            name: `${dict.hero.h1} — ${dict.meta.siteName}`,
            description: dict.meta.defaultDescription,
            primaryImage: '/images/works/roof-panel-restored.webp',
          }),
          faqSchema(dict.faq.items),
          videoListSchema(locale),
        ]}
      />
    </>
  );
}
