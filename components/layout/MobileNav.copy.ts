import type { Dictionary } from '@/lib/i18n/dictionaries';

export interface MobileNavCopy {
  /** The nav block whole: every label in it is rendered here, keyed by route. */
  nav: Dictionary['nav'];
  contactTitle: string;
  callWithNumber: string;
  callAria: string;
  directions: string;
  instagram: string;
  youtube: string;
}

/**
 * Built on the server, so the menu ships its own labels rather than the whole
 * dictionary — this component sits in the layout, so its props are serialised
 * into every page on the site.
 */
export function mobileNavCopy(dict: Dictionary): MobileNavCopy {
  return {
    nav: dict.nav,
    contactTitle: dict.footer.contactTitle,
    callWithNumber: dict.common.callWithNumber,
    callAria: dict.common.callAria,
    directions: dict.common.directions,
    instagram: dict.common.instagram,
    youtube: dict.common.youtube,
  };
}
