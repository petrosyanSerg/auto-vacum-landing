/**
 * Conversion events.
 *
 * Nothing here loads a tracker. `track` hands the event to whichever providers
 * the deployment has actually configured and silently does nothing otherwise,
 * so the call sites in components never need to know whether analytics is on.
 */

export type AnalyticsEvent =
  | 'phone_click'
  | 'map_click'
  | 'directions_click'
  | 'instagram_click'
  | 'youtube_click'
  | 'video_play'
  | 'photo_upload_start'
  | 'contact_form_submit'
  | 'language_change'
  | 'before_after_interaction'
  | 'work_filter';

type Params = Record<string, string | number | boolean>;

interface AnalyticsWindow extends Window {
  gtag?: (command: string, event: string, params?: Params) => void;
  ym?: (id: number, action: string, target: string, params?: Params) => void;
  clarity?: (action: string, ...args: unknown[]) => void;
  dataLayer?: unknown[];
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as AnalyticsWindow;

  try {
    w.gtag?.('event', event, params);

    const metricaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID);
    if (w.ym && Number.isFinite(metricaId) && metricaId > 0) {
      w.ym(metricaId, 'reachGoal', event, params);
    }

    w.clarity?.('event', event);
  } catch {
    // Analytics must never break an interaction the customer is in the middle of.
  }
}
