# Auto Vacuum — PDR workshop site

Marketing site for a paintless dent repair and auto vacuum workshop in Abovyan,
Armenia. Built to do one job: get the phone to ring.

Next.js App Router, TypeScript, SCSS Modules. Five languages, 45 static pages,
no CSS framework and no UI library.

```bash
npm install
npm run dev        # http://localhost:3000
```

---

## What the site is built around

A PDR technician judges a panel by laying a straight line of light across it. If
the line bends, there is a dent. When the line runs straight again, the job is
done. That reading is the site's one visual motif, and it appears in exactly
three places: the hero comparison handle is drawn as the striped light board the
technician actually holds, the process diagram is a single line that arrives
buckled and leaves flat, and section labels are cut in with a short segment of
the same line.

Everything else is deliberately quiet. The interface is entirely achromatic, so
the one saturated colour in the palette — the red the owner uses to circle dents
in his own videos — keeps a single meaning throughout: *this is the damage*. It
is never a button, a link, or a heading colour. The highest-contrast element on
any screen is the call button.

---

## Business facts and where they live

Every fact rendered anywhere on the site comes from
[`config/business.ts`](config/business.ts). Change it there and it changes in
the copy, the footer, the schema, the sitemap and the map links at once.

Values were taken from the owner's own public listings and channel, and several
are confirmed on-screen in his own videos (the address and phone number appear
as overlays in `h0Z3qAob9jk`, `PHrzsklW36M` and `skLR9KHU02Y`).

**Verified and in use**

| Fact | Value |
| --- | --- |
| Trading name | Auto Vacuum |
| Phone | 099 22 95 90 (`+37499229590`) |
| Address | 37/1 Sevan St., 8th microdistrict, Abovyan, Kotayk |
| Instagram | `@auto.vacuum_` |
| YouTube | `@sergeypetrosyan5608` |

**Deliberately absent** — these are not published anywhere the owner controls,
so they are `null`/empty rather than guessed. Each one is a single edit away
from appearing everywhere it belongs:

| Missing | What the site does instead |
| --- | --- |
| `COORDINATES` | Maps resolve from the address string; `geo` is omitted from schema |
| `OPENING_HOURS` | Shows "call to confirm"; no `openingHoursSpecification` emitted |
| `PRICE_RANGE` | No price anywhere; the FAQ explains what a quote depends on |
| Reviews | No testimonials section. List.am shows a 5.0 rating built from one review, which is not a meaningful aggregate, so no `aggregateRating` is emitted |

Do not fill any of these with a plausible-looking value. The schema is wired to
include them the moment they are real.

---

## Photographs

Every image on the site is a still cut from one of the workshop's own videos.
Sources live in `_source-media/` (git-ignored); the optimised WebP output in
`public/images/` is what ships.

```bash
npm run assets:images   # rebuild stills from _source-media
npm run assets:brand    # rebuild the touch icon and the social preview card
```

One honest constraint shaped the gallery. A draggable before/after only tells
the truth when both frames come from the same clip **and** show the same panel.
Exactly one published job clears that bar — the hail-damaged roof — so it is the
only entry in `comparisons` in [`content/works.ts`](content/works.ts) and it
carries the hero. Every other frame is labelled for what it actually shows
(damage, finished, or mid-job) and links out to the clip it came from, so a
visitor can check rather than take it on trust. Add more pairs to `comparisons`
as the owner publishes them; do not pair frames to fill the grid.

---

## Languages

Armenian is the default and is served without a prefix. The other four are
prefixed.

```
/            /ru/         /en/         /kk/         /ka/
/works       /ru/works    /en/works    /kk/works    /ka/works
```

`proxy.ts` rewrites `/works` to `/hy/works` internally and 308-redirects
`/hy/works` back to `/works`, so every document has exactly one canonical URL.

Translations are typed modules under
[`content/translations/`](content/translations/), one file per locale, all
satisfying the `Dictionary` contract in `types.ts`. A missing string is a
TypeScript error, not a blank space on the page. Nothing is machine-translated
at runtime — pages are Server Components, so no dictionary reaches the browser.

To add a language: add the code to `lib/i18n/config.ts`, add a file under
`content/translations/`, register it in `lib/i18n/dictionaries.ts`. Routing,
hreflang, the sitemap and the switcher pick it up automatically.

Type is one Noto superfamily across all five scripts, so Armenian, Georgian,
Cyrillic and Latin share a design. Each cut declares only the subsets it needs,
so a Russian visitor never downloads Georgian glyphs. Numerals, codes and the
phone number are set in JetBrains Mono.

---

## Structure

```
app/[locale]/          pages: home, services, services/[slug], works, faq, contact
app/api/lead/          photo form endpoint
app/robots.ts          app/sitemap.ts   app/manifest.ts
components/
  layout/              header, footer, mobile menu, bottom action bar, page header
  sections/            the homepage sections, reused across inner pages
  gallery/             BeforeAfter (the signature), WorksGrid
  media/ map/ forms/   video wall, click-to-load map, photo form
  ui/ seo/             buttons, icons, the beam field, JSON-LD, analytics
config/business.ts     single source of truth for every business fact
content/               translations, works, videos, services
lib/                   i18n, seo, analytics, form validation
styles/                tokens in globals.scss, mixins in _abstracts.scss
```

`_abstracts.scss` is injected into every stylesheet by `next.config.ts`, so
modules get tokens and mixins without importing them.

---

## Client-side JavaScript

Server Components by default. Six client components exist, each for a reason
that genuinely needs the browser: the comparison slider, the works filter, the
video wall, the map loader, the photo form, the language switcher and the mobile
menu.

Everything else is delegated to one small component,
[`SiteBehaviour`](components/layout/SiteBehaviour.tsx), which handles conversion
tracking, the header scroll state and scroll reveal for the whole site. So
`data-track="phone_click"` works on a plain server-rendered anchor, and no
element has to become a client component to be tracked or animated.

Scroll reveal is an enhancement and never a prerequisite. The rule that hides
`[data-reveal]` is scoped to `html[data-reveal-armed]`, and only `SiteBehaviour`
sets that attribute. With JavaScript off, with reduced motion requested, or if
the script throws, the page renders finished rather than blank.

---

## Performance

- Local WebP posters for all nine videos. A YouTube player is inserted only into
  the cell a visitor presses, and only via `youtube-nocookie`.
- The map is a drawing until clicked. No tiles, no cookie, no third-party
  request before that.
- Analytics scripts load `afterInteractive`, and only when a real id is set.
- `next/image` everywhere with per-breakpoint `sizes`, AVIF and WebP output.
- The hero comparison is the only `priority` image on the page.

## Accessibility

- The comparison is a native `<input type="range">` laid over the frame, so
  pointer, touch, arrow keys, Home and End all work with no custom key handling,
  and it announces itself as a slider.
- The FAQ is `<details>`/`<summary>` — keyboard operable and findable in-page
  with no JavaScript.
- The mobile menu traps focus, closes on Escape, restores focus to its trigger,
  and locks body scroll.
- Skip link, visible focus rings on everything, semantic landmarks, `<address>`
  for the real address, alt text on every meaningful image.
- Motion is gated behind `prefers-reduced-motion: no-preference` throughout.

---

## Checks

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run build       # 45 static pages
npm run check       # all three
```

## Documentation

- [Deployment](docs/deployment.md) — hosting, environment, DNS
- [SEO checklist](docs/seo-checklist.md) — what is implemented, and what to verify
- [Post-launch setup](docs/post-launch.md) — Google, Yandex, Bing, Business Profile
