'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics/events';

/**
 * The whole site's ambient JavaScript, in one place and around a kilobyte.
 *
 * Three jobs, all delegated so no other element on the page has to become a
 * Client Component to get them:
 *
 *  1. Conversion tracking — any element carrying `data-track="phone_click"`
 *     reports that event when clicked, so links stay plain server-rendered
 *     anchors.
 *  2. Scroll reveal — see the note on `armReveal` below.
 *  3. Header state — sets `data-scrolled` on <html> past the first scroll.
 */
export function SiteBehaviour() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest<HTMLElement>('[data-track]');
      const name = trigger?.dataset.track;
      if (name) track(name as AnalyticsEvent);
    };

    document.addEventListener('click', onClick, { passive: true });
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const onScroll = () => {
      root.toggleAttribute('data-scrolled', window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Re-armed on every navigation, not just on mount. This component lives in
  // the layout, which the App Router keeps mounted across soft navigation, so
  // a scan that ran once would never see the next page's elements and would
  // leave them hidden by CSS with nothing left to reveal them.
  useEffect(() => armReveal(), [pathname]);

  return null;
}

/**
 * Scroll reveal.
 *
 * The rule that hides `[data-reveal]` is scoped to `html[data-reveal-armed]`,
 * and that attribute is only ever set here, immediately before the first scan.
 * So with JavaScript disabled, with reduced motion requested, or if anything
 * below throws, every element renders at full opacity — the animation is an
 * enhancement, never a prerequisite for seeing the page.
 *
 * This runs again on every navigation. The caller keeps it keyed to the current
 * path because the elements it scans are replaced wholesale on each route
 * change, and a scan that ran only on mount would hide the next page without
 * ever revealing it.
 *
 * Position is measured with getBoundingClientRect on a passive scroll listener
 * rather than with IntersectionObserver. It is a few reads on a list that
 * empties as the page is scrolled, it behaves the same whether the visitor
 * scrolls in or lands deep in the page from a link, and it does not depend on
 * an observer firing correctly inside embedded or emulated viewports.
 */
function armReveal(): (() => void) | undefined {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  // Clear rather than just bail: on a re-arm the attribute may be left over
  // from the previous page, and leaving it set with nothing scanning would
  // hide this page's content for good.
  if (reduced || pending.length === 0) {
    root.removeAttribute('data-reveal-armed');
    return;
  }

  const check = () => {
    // Anything whose top edge has crossed into the lower nine tenths of the
    // viewport is revealed — which also covers everything already scrolled
    // past, so scrolling back up never finds a blank gap.
    const limit = window.innerHeight * 0.9;
    for (let i = pending.length - 1; i >= 0; i -= 1) {
      const el = pending[i];
      if (!el) continue;
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add('is-revealed');
        pending.splice(i, 1);
      }
    }
  };

  /**
   * Deliberately synchronous rather than requestAnimationFrame-throttled: a
   * hidden or backgrounded tab stops serving animation frames, and a scheduled
   * callback that never runs would leave content stuck at zero opacity. These
   * are a few rect reads on a list that empties as the page is scrolled, so
   * running them inline on a passive listener costs nothing measurable.
   */
  const schedule = () => {
    if (pending.length > 0) check();
  };

  // Hide first, then immediately reveal what is already on screen, so the
  // first paint after hydration is never a blank page.
  try {
    root.setAttribute('data-reveal-armed', '');
    check();
  } catch {
    root.removeAttribute('data-reveal-armed');
    return;
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('load', schedule);
  window.addEventListener('hashchange', schedule);

  // Images and fonts settling can move elements into view without a scroll.
  const settle = [window.setTimeout(schedule, 350), window.setTimeout(schedule, 1400)];

  return () => {
    settle.forEach(window.clearTimeout);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('load', schedule);
    window.removeEventListener('hashchange', schedule);
  };
}
