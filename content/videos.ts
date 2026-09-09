/**
 * The workshop's own YouTube shorts. Posters are local stills, so the video
 * wall costs nothing until a visitor presses play; only then is a player
 * iframe inserted.
 */
export interface WorkVideo {
  /** YouTube video id. */
  id: string;
  /** Reuses a `dictionary.works.items` key, so the caption is already translated. */
  captionKey: string;
}

export const VIDEO_POSTER_SIZE = { width: 640, height: 800 } as const;

export const videos: WorkVideo[] = [
  { id: 'vBom9-rVDKM', captionKey: 'roof-hail-after' },
  { id: 'h0Z3qAob9jk', captionKey: 'white-fender-finished' },
  { id: 'qxpI-JVINtg', captionKey: 'silver-quarter-marked' },
  { id: 'ia1YMuTUTAw', captionKey: 'yellow-quarter-impact' },
  { id: 'NXGxS93DUnw', captionKey: 'dark-wing-finished' },
  { id: 'sNBGVbobXa8', captionKey: 'fender-metal-strip' },
  { id: 'vU2-zcZp0V4', captionKey: 'reflection-check' },
  { id: 'PHrzsklW36M', captionKey: 'reflection-check' },
  { id: 'skLR9KHU02Y', captionKey: 'dark-wing-finished' },
];

export const videoPoster = (id: string) => `/images/video/${id}.webp`;
export const videoWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/** `youtube-nocookie` keeps the tracking surface as small as the platform allows. */
export const videoEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
