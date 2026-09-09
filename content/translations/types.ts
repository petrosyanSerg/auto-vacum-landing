/**
 * The translation contract. Every locale file must satisfy `Dictionary`, so a
 * missing string is a TypeScript error rather than a blank space on the page.
 * Nothing here is machine-translated at runtime.
 */

export type ServiceSlug = 'pdr' | 'auto-vacuum' | 'hail-damage' | 'dent-removal';

export type WorkCategory =
  | 'hail'
  | 'door'
  | 'fender'
  | 'hood'
  | 'roof'
  | 'parking'
  | 'impact'
  | 'restoration';

export interface QA {
  q: string;
  a: string;
}

export interface TitledBody {
  title: string;
  body: string;
}

export interface ServiceCopy {
  /** Short name used in cards, nav and breadcrumbs. */
  name: string;
  /** One line under the card title. */
  summary: string;
  /** <h1> of the dedicated service page. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Two to four paragraphs of plain-language explanation. */
  body: string[];
  /** "Suitable when…" list. */
  suitedFor: string[];
  /** Honest limits. Rendered under a "when it is not the right method" heading. */
  limits: string;
  faq: QA[];
}

export interface Dictionary {
  meta: {
    siteName: string;
    /** Used after the page title in <title> templates. */
    titleSuffix: string;
    defaultDescription: string;
    ogImageAlt: string;
  };

  nav: {
    home: string;
    services: string;
    works: string;
    process: string;
    faq: string;
    location: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    menuLabel: string;
    languageLabel: string;
    currentLanguage: string;
    skipToContent: string;
    breadcrumb: string;
  };

  common: {
    call: string;
    callWithNumber: string;
    callAria: string;
    phoneLabel: string;
    directions: string;
    onTheMap: string;
    instagram: string;
    youtube: string;
    before: string;
    after: string;
    watchOnYoutube: string;
    playVideo: string;
    all: string;
    filterLabel: string;
    address: string;
    openingHours: string;
    hoursUnknown: string;
    sourceNote: string;
    readMore: string;
    backHome: string;
    damageState: { before: string; after: string; process: string };
  };

  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    dragHint: string;
    comparisonLabel: string;
    comparisonCaption: string;
    locationLine: string;
    scrollCue: string;
  };

  trust: {
    label: string;
    items: TitledBody[];
  };

  proof: {
    label: string;
    title: string;
    lead: string;
    lineNote: string;
    videoTitle: string;
    videoLead: string;
    channelCta: string;
  };

  servicesSection: {
    label: string;
    title: string;
    lead: string;
    cardCta: string;
    allCta: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    pageLead: string;
  };

  process: {
    label: string;
    title: string;
    lead: string;
    steps: TitledBody[];
    note: string;
  };

  why: {
    label: string;
    title: string;
    lead: string;
    points: TitledBody[];
  };

  damage: {
    label: string;
    title: string;
    lead: string;
    items: TitledBody[];
    note: string;
  };

  works: {
    label: string;
    title: string;
    lead: string;
    allCta: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    pageLead: string;
    empty: string;
    categories: Record<WorkCategory, string>;
    items: Record<string, { title: string; note: string }>;
  };

  faq: {
    label: string;
    title: string;
    lead: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    pageLead: string;
    items: QA[];
  };

  location: {
    label: string;
    title: string;
    lead: string;
    mapLoadCta: string;
    mapLoadNote: string;
    mapTitle: string;
    provider: { google: string; yandex: string };
  };

  finalCta: {
    label: string;
    title: string;
    lead: string;
    or: string;
  };

  contact: {
    metaTitle: string;
    metaDescription: string;
    h1: string;
    pageLead: string;
    channelsTitle: string;
    formTitle: string;
    formLead: string;
    photoLabel: string;
    photoHint: string;
    photoChoose: string;
    photoChange: string;
    photoRemove: string;
    descriptionLabel: string;
    descriptionHint: string;
    phoneFieldLabel: string;
    phoneFieldHint: string;
    submit: string;
    sending: string;
    disclaimer: string;
    disabledTitle: string;
    disabledBody: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    errors: {
      noFile: string;
      tooLarge: string;
      badType: string;
      tooManyFiles: string;
    };
  };

  footer: {
    tagline: string;
    servicesTitle: string;
    siteTitle: string;
    contactTitle: string;
    languagesTitle: string;
    rights: string;
    builtNote: string;
  };

  services: Record<ServiceSlug, ServiceCopy>;
}
