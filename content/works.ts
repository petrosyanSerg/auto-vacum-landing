import type { WorkCategory } from './translations/types';

/**
 * The published portfolio.
 *
 * Every entry points at a still cut from one of the workshop's own videos, so
 * `video` is always the source clip and `state` describes what the frame
 * actually shows. Nothing is presented as a before/after pair unless both
 * frames come from the same clip and show the same panel — see `comparisons`
 * below, which is deliberately short for exactly that reason.
 */

export interface WorkItem {
  /** Key into `dictionary.works.items`. */
  id: string;
  /** File under /public/images/works, without extension. */
  image: string;
  width: number;
  height: number;
  category: WorkCategory;
  state: 'before' | 'after' | 'process';
  /** YouTube id of the clip this frame came from. */
  video: string;
  /** Larger tile in the editorial grid. Used sparingly. */
  feature?: boolean;
}

export const WORK_IMAGE_SIZE = { width: 1000, height: 1250 } as const;

export const works: WorkItem[] = [
  {
    id: 'roof-hail-before',
    image: 'roof-dent-inspection',
    ...WORK_IMAGE_SIZE,
    category: 'roof',
    state: 'before',
    video: 'vBom9-rVDKM',
  },
  {
    id: 'roof-hail-after',
    image: 'roof-panel-restored',
    ...WORK_IMAGE_SIZE,
    category: 'roof',
    state: 'after',
    video: 'vBom9-rVDKM',
    feature: true,
  },
  {
    id: 'silver-quarter-marked',
    image: 'dent-assessment-marked-rear-quarter',
    ...WORK_IMAGE_SIZE,
    category: 'hail',
    state: 'before',
    video: 'qxpI-JVINtg',
    feature: true,
  },
  {
    id: 'silver-quarter-finished',
    image: 'restored-rear-quarter-panel',
    ...WORK_IMAGE_SIZE,
    category: 'impact',
    state: 'after',
    video: 'ia1YMuTUTAw',
  },
  {
    id: 'white-sill-crease',
    image: 'door-crease-dent-white-car',
    ...WORK_IMAGE_SIZE,
    category: 'door',
    state: 'before',
    video: 'h0Z3qAob9jk',
  },
  {
    id: 'white-fender-finished',
    image: 'restored-front-fender-reflection',
    ...WORK_IMAGE_SIZE,
    category: 'fender',
    state: 'after',
    video: 'h0Z3qAob9jk',
  },
  {
    id: 'yellow-quarter-impact',
    image: 'impact-dent-yellow-quarter-panel',
    ...WORK_IMAGE_SIZE,
    category: 'impact',
    state: 'before',
    video: 'ia1YMuTUTAw',
  },
  {
    id: 'fender-metal-strip',
    image: 'metal-restoration-fender-removed',
    ...WORK_IMAGE_SIZE,
    category: 'restoration',
    state: 'process',
    video: 'sNBGVbobXa8',
    feature: true,
  },
  {
    id: 'dark-wing-finished',
    image: 'restored-front-wing-dark-car',
    ...WORK_IMAGE_SIZE,
    category: 'fender',
    state: 'after',
    video: 'skLR9KHU02Y',
  },
  {
    id: 'reflection-check',
    image: 'reflection-line-panel-check',
    ...WORK_IMAGE_SIZE,
    category: 'parking',
    state: 'process',
    video: 'PHrzsklW36M',
  },
  {
    id: 'dent-mapping',
    image: 'dent-mapping-close-up',
    ...WORK_IMAGE_SIZE,
    category: 'door',
    state: 'process',
    video: 'qxpI-JVINtg',
  },
];

export const workCategories: WorkCategory[] = [
  'roof',
  'door',
  'fender',
  'hail',
  'impact',
  'parking',
  'restoration',
];

/**
 * Draggable before/after comparisons.
 *
 * Only pairs where both frames show the same panel from the same camera
 * position belong here — the slider wipes one over the other, so anything else
 * reads as two different cars. These frames come from the workshop's own
 * photographs rather than the video stills, so they carry no clip id and do not
 * appear in the portfolio grid.
 */
export interface ComparisonFrame {
  /** Key into `dictionary.works.items`, used for the alt text. */
  id: string;
  /** File under /public/images/works, without extension. */
  image: string;
  width: number;
  height: number;
}

export interface Comparison {
  id: string;
  before: ComparisonFrame;
  after: ComparisonFrame;
}

export const comparisons: Comparison[] = [
  {
    id: 'arch-crease',
    before: { id: 'arch-crease-before', image: 'arch-crease-before', ...WORK_IMAGE_SIZE },
    after: { id: 'arch-crease-after', image: 'arch-crease-after', ...WORK_IMAGE_SIZE },
  },
];

export const heroComparison: Comparison | undefined = comparisons[0];

export function workImagePath(item: { image: string }): string {
  return `/images/works/${item.image}.webp`;
}
