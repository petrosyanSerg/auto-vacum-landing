import {
  ADDRESS,
  BRAND,
  COORDINATES,
  MAPS,
  OPENING_HOURS,
  PHONE_E164,
  PRICE_RANGE,
  SITE_URL,
  SOCIAL,
} from '@/config/business';
import { serviceSlugs } from '@/content/services';
import { videos, videoWatchUrl } from '@/content/videos';
import { works } from '@/content/works';
import { locales, localeMeta, type Locale } from '@/lib/i18n/config';
import { absoluteUrl, servicePath } from '@/lib/i18n/routes';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { QA, ServiceSlug } from '@/content/translations/types';

/**
 * Structured data.
 *
 * Rule for this file: a property is emitted only when a real, checked value
 * backs it. Coordinates, opening hours, price range and ratings are all absent
 * from the business's public listings, so they are absent here too rather than
 * being guessed. Every one of those is a single edit in config/business.ts away
 * from appearing, once the owner supplies the real value.
 */

const LOCAL_BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Stable @id for a document, so WebPage nodes can be referenced across the graph. */
const pageId = (locale: Locale, path: string) => `${absoluteUrl(locale, path)}#webpage`;

/** Every language this site is actually published in. */
const SITE_LANGUAGES = locales.map((l) => localeMeta[l].htmlLang);

export function localBusinessSchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    // AutoRepair is the narrowest type that genuinely describes the trade.
    '@type': ['AutoRepair', 'LocalBusiness'],
    '@id': LOCAL_BUSINESS_ID,
    name: BRAND.name,
    alternateName: `${BRAND.name} ${BRAND.descriptor}`,
    description: dict.meta.defaultDescription,
    url: absoluteUrl(locale, '/'),
    telephone: PHONE_E164,
    image: `${SITE_URL}/images/works/roof-panel-restored.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.streetAddress[locale],
      addressLocality: ADDRESS.addressLocality[locale],
      addressRegion: ADDRESS.addressRegion[locale],
      addressCountry: ADDRESS.addressCountry,
      ...(ADDRESS.postalCode ? { postalCode: ADDRESS.postalCode } : {}),
    },
    ...(COORDINATES
      ? { geo: { '@type': 'GeoCoordinates', latitude: COORDINATES.lat, longitude: COORDINATES.lng } }
      : {}),
    ...(OPENING_HOURS.length
      ? {
          openingHoursSpecification: OPENING_HOURS.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(PRICE_RANGE ? { priceRange: PRICE_RANGE } : {}),
    hasMap: MAPS.yandexPlace,
    areaServed: [
      { '@type': 'City', name: ADDRESS.addressLocality[locale] },
      { '@type': 'AdministrativeArea', name: ADDRESS.addressRegion[locale] },
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.youtube, SOCIAL.listam],
    // One reachable channel, described honestly: a phone, answered in the
    // languages this site is published in. No email or chat desk is claimed.
    contactPoint: {
      '@type': 'ContactPoint',
      '@id': `${SITE_URL}/#contact`,
      contactType: 'customer service',
      telephone: PHONE_E164,
      areaServed: ADDRESS.addressCountry,
      availableLanguage: SITE_LANGUAGES,
    },
    knowsLanguage: SITE_LANGUAGES,
    // Verified from the owner's own List.am seller profile and YouTube channel.
    employee: { '@type': 'Person', name: BRAND.masterName },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.servicesSection.title,
      itemListElement: serviceSlugs.map((slug) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: dict.services[slug].name,
          url: absoluteUrl(locale, servicePath(slug)),
        },
      })),
    },
  };
}

export function websiteSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: dict.meta.siteName,
    url: absoluteUrl(locale, '/'),
    inLanguage: locale,
    publisher: { '@id': LOCAL_BUSINESS_ID },
  };
}

export function serviceSchema(locale: Locale, slug: ServiceSlug) {
  const dict = getDictionary(locale);
  const service = dict.services[slug];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.metaDescription,
    url: absoluteUrl(locale, servicePath(slug)),
    serviceType: service.name,
    provider: { '@id': LOCAL_BUSINESS_ID },
    areaServed: [
      { '@type': 'City', name: ADDRESS.addressLocality[locale] },
      { '@type': 'AdministrativeArea', name: ADDRESS.addressRegion[locale] },
    ],
    // The only booking channel that exists: the phone, and the page itself.
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: PHONE_E164 },
      serviceUrl: absoluteUrl(locale, servicePath(slug)),
    },
    inLanguage: locale,
  };
}

/**
 * The document node: what ties one URL to the site and the business, and the
 * node an answer engine reads to decide what a page is *about*. `type` narrows
 * to ContactPage / CollectionPage / FAQPage where that is what the page is.
 */
export function webPageSchema({
  locale,
  path,
  name,
  description,
  type = 'WebPage',
  primaryImage,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  type?: 'WebPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage' | 'AboutPage';
  /** Site-relative image path, e.g. `/images/works/roof-panel-restored.webp`. */
  primaryImage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': pageId(locale, path),
    url: absoluteUrl(locale, path),
    name,
    description,
    inLanguage: localeMeta[locale].htmlLang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': LOCAL_BUSINESS_ID },
    ...(primaryImage
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            contentUrl: `${SITE_URL}${primaryImage}`,
          },
        }
      : {}),
  };
}

/**
 * The portfolio as machine-readable evidence. Each frame carries the panel it
 * shows, whether it is a before/after/in-progress state, and the clip it was
 * cut from — so the visual proof is legible without opening the images.
 */
export function worksGallerySchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${SITE_URL}/#works`,
    name: dict.works.h1,
    description: dict.works.metaDescription,
    inLanguage: localeMeta[locale].htmlLang,
    associatedMedia: works.map((item) => {
      const caption = dict.works.items[item.id];
      return {
        '@type': 'ImageObject',
        contentUrl: `${SITE_URL}/images/works/${item.image}.webp`,
        name: caption?.title ?? dict.works.h1,
        caption: caption?.note ?? dict.works.lead,
        description: `${dict.works.categories[item.category]} — ${
          dict.common.damageState[item.state]
        }`,
        width: item.width,
        height: item.height,
        creator: { '@id': LOCAL_BUSINESS_ID },
        isBasedOn: videoWatchUrl(item.video),
      };
    }),
  };
}

export function faqSchema(items: QA[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbSchema(locale: Locale, trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(locale, crumb.path),
    })),
  };
}

/**
 * The video wall, as a list of the workshop's published clips. No upload date
 * or duration is emitted: neither is known from the channel listing, and
 * VideoObject tolerates their absence better than it tolerates a guess.
 */
export function videoListSchema(locale: Locale) {
  const dict = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: dict.proof.videoTitle,
    itemListElement: videos.map((video, index) => {
      const caption = dict.works.items[video.captionKey];
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'VideoObject',
          name: caption?.title ?? dict.proof.videoTitle,
          description: caption?.note ?? dict.proof.videoLead,
          thumbnailUrl: `${SITE_URL}/images/video/${video.id}.webp`,
          contentUrl: videoWatchUrl(video.id),
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
        },
      };
    }),
  };
}
