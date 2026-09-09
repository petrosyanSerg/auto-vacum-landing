import { videos } from '@/content/videos';
import type { Dictionary } from '@/lib/i18n/dictionaries';

export interface VideoWallCopy {
  playVideo: string;
  fallbackTitle: string;
  titles: Record<string, string>;
}

/**
 * Built on the server so only these few strings are serialised into the page,
 * rather than the whole dictionary this component used to be handed.
 */
export function videoWallCopy(dict: Dictionary): VideoWallCopy {
  const titles: Record<string, string> = {};
  for (const video of videos) {
    const title = dict.works.items[video.captionKey]?.title;
    if (title) titles[video.id] = title;
  }
  return { playVideo: dict.common.playVideo, fallbackTitle: dict.proof.videoTitle, titles };
}
