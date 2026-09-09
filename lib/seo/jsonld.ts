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
import type { Locale } from '@/lib/i18n/config';
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
    hasMap: MAPS.googleDirections,
    areaServed: [
      { '@type': 'City', name: ADDRESS.addressLocality[locale] },
      { '@type': 'AdministrativeArea', name: ADDRESS.addressRegion[locale] },
    ],
    sameAs: [SOCIAL.instagram, SOCIAL.youtube, SOCIAL.listam],
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
    '@id': `${SITE_URL}/#website`,
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
    areaServed: {
      '@type': 'AdministrativeArea',
      name: ADDRESS.addressRegion[locale],
    },
    inLanguage: locale,
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
