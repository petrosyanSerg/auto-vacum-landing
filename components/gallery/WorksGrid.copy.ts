import type { WorkItem } from '@/content/works';
import type { Dictionary } from '@/lib/i18n/dictionaries';

export interface WorksGridCopy {
  filterLabel: string;
  all: string;
  empty: string;
  watchOnYoutube: string;
  sourceNote: string;
  damageState: Dictionary['common']['damageState'];
  categories: Dictionary['works']['categories'];
  items: Dictionary['works']['items'];
}

/**
 * Built on the server, so the browser is sent the handful of labels this grid
 * renders instead of the whole dictionary. Captions are cut down to the tiles
 * actually on the page.
 */
export function worksGridCopy(dict: Dictionary, shown: WorkItem[]): WorksGridCopy {
  const items: WorksGridCopy['items'] = {};
  for (const item of shown) {
    const copy = dict.works.items[item.id];
    if (copy) items[item.id] = copy;
  }

  return {
    filterLabel: dict.common.filterLabel,
    all: dict.common.all,
    empty: dict.works.empty,
    watchOnYoutube: dict.common.watchOnYoutube,
    sourceNote: dict.common.sourceNote,
    damageState: dict.common.damageState,
    categories: dict.works.categories,
    items,
  };
}
