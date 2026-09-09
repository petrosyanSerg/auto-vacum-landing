# Refactoring report

Scope: full engineering audit of the Next.js App Router site, followed by
targeted refactoring. Baseline and final state were both validated with
`npm run typecheck`, `npm run lint`, `npm run build` and a smoke test against
`npm run start`.

## Headline

The codebase was already close to the target standard before this pass. It had
strict TypeScript with no `any` and no suppressions, working `@/*` aliases,
Server Components by default, one source of truth for business data, a route
registry, and a small dependency tree (three runtime dependencies, all used).
The baseline passed typecheck, lint and build unchanged.

So this was not a rewrite. Six real problems were found and fixed. Everything
else in the audit came back clean and was deliberately left alone.

## Architecture before

```
app/[locale]/        pages and layout, one segment per locale
components/          layout · sections · ui · gallery · forms · media · map · seo
config/business.ts   verified business data, one source of truth
content/             services · works · videos · translations (5 locales)
lib/                 i18n · seo · analytics · forms
styles/              global tokens + SCSS modules per component
```

Aliases were already configured (`@/*` to the project root) and resolving
correctly in TypeScript, ESLint and the production build.

## Problems found and fixed

### 1. The whole dictionary was serialised into the client payload

The largest real defect. Four Client Components took the entire `Dictionary`
object as a prop: `WorksGrid`, `MobileNav`, `VideoWall` and `PhotoAssessment`.
React serialises Client Component props into the RSC flight payload, so every
page shipped its locale's complete translation file, roughly 580 lines of
strings including metadata-only values such as `meta.titleSuffix`, which is
never rendered anywhere.

Each of those components now receives only the strings it renders, built on the
server by a `*.copy.ts` module beside it. The builders live in separate modules
because a `'use client'` file's exports are all client references and cannot be
called from the server.

Measured on the prerendered HTML:

| Page          | Before  | After   | Change |
| ------------- | ------- | ------- | ------ |
| `/en`         | 233,754 | 215,928 | -7.6%  |
| `/en/works`   | 168,564 | 149,973 | -11.0% |
| `/en/contact` | 106,612 | 87,095  | -18.3% |

`titleSuffix` no longer appears in any served HTML, which confirms the
dictionary itself no longer crosses the boundary.

This is the Interface Segregation problem in concrete form: components were
handed a large object to use a handful of fields from it.

### 2. Visible breadcrumbs disagreed with BreadcrumbList

`PageHeader` carried a comment stating that the visible trail and the
structured-data trail cannot diverge. On service pages they did: the visible
current crumb rendered the long H1 (`service.h1`) while `BreadcrumbList` emitted
the short service name (`service.name`).

The trail is now declared once per page and consumed by both the masthead and
the schema. `PageHeader` takes the whole trail including the current page and
renders the last entry as `aria-current="page"`. Verified in the prerendered
HTML: the visible crumb and position 3 of `BreadcrumbList` now match on every
service page in every locale.

### 3. Duplicated page preamble and a redundant type cast

All six pages and the layout repeated the same four steps: await params, guard
the locale, 404, load the dictionary. Each then wrote `locale as Locale`,
although `isLocale` is a type guard that had already narrowed the value.

Added `lib/i18n/page.ts` with `resolveLocalePage` (404s on an unknown locale)
and `resolveLocaleMeta` (returns null, because the page component owns the 404).
Seven `as Locale` casts and seven `typedLocale` aliases are gone.

### 4. Dead route configuration

Four pages redeclared `dynamicParams = false` and a `generateStaticParams` that
was identical to the locale layout's. The homepage never had them and was
already prerendered, which is what proved they were inherited. Removed from all
four. The route table is unchanged: 49 prerendered documents, every route still
marked SSG.

### 5. Dead code

- `trackClick` in `lib/analytics/events.ts`, exported and never called.
- `.foot` in `VideoWall.module.scss`; the video section uses `sectionStyles.foot`.

A scan of every CSS module against its consuming components turned up no other
unreferenced rules. Earlier candidates were false positives: classes reached
through `styles[variant]`, or through a sibling component importing the same
module.

### 6. Minor

Removed `locale: locale` shorthand redundancy in schema calls.

## Audited and deliberately left alone

- **Client and Server boundaries.** Thirteen Client Components; each needs
  browser state, pointer input or an observer. No page or layout is marked
  `'use client'`. Nothing to convert.
- **`useEffect` usage.** Nine effects total. Every one subscribes to something
  external (scroll, popstate, IntersectionObserver, matchMedia) or drives a
  timer. None computes derived state.
- **Memoisation.** Two `useMemo` calls, both on list filtering. No blanket
  `useCallback`.
- **TypeScript.** `strict` plus `noUncheckedIndexedAccess`. Zero `any`, zero
  `as any`, zero `@ts-ignore`. Nothing to clean.
- **Dependencies.** `next`, `react`, `react-dom`. Nothing unused, nothing worth
  replacing.
- **Images and fonts.** `next/image` throughout with explicit `sizes` and
  `quality`; `priority` set on the hero comparison only. Fonts via `next/font`
  with per-script subsets and Georgian excluded from preload.
- **Analytics.** Already a single typed `track` funnel with delegated
  `data-track` attributes, so links stay server-rendered anchors.
- **Security.** The lead API route re-validates count, size, MIME and extension
  server-side and then sniffs the file signature, which is the only unforgeable
  signal. Filenames are regenerated. The one `dangerouslySetInnerHTML` is
  JSON-LD built from typed literals with `<` escaped. No secrets reach the
  client, and `.env.example` already documents the variables.
- **`LISTAM_RATING`** in `config/business.ts` is exported but unused. It is
  deliberately parked verified data with a documented rationale for why it is
  not emitted as an `aggregateRating`, so it was kept.

## SEO, AEO and GEO

Preserved in full and verified against the running production server: canonical
URLs, five hreflang alternates plus `x-default`, Open Graph and Twitter cards,
sitemap, robots, manifest. Structured data was compared per page before and
after. `LocalBusiness`/`AutoRepair`, `WebSite`, `WebPage`/`CollectionPage`/
`ContactPage`, `Service`, `FAQPage`, `VideoObject`, `ImageGallery` and
`BreadcrumbList` all still emit, and the breadcrumb mismatch above is now fixed
rather than merely preserved.

All answerable content, meaning FAQ answers, service copy, address and phone,
remains server-rendered in the HTML document. The prop narrowing removed only
strings that were never rendered on those pages; it did not move anything into
JavaScript.

## Accessibility

Unchanged, with one improvement: the current breadcrumb keeps
`aria-current="page"` and now carries the same short label a crawler reads.
Skip link, focus trap in the mobile menu, `aria-pressed` filters, the native
range input behind the comparison slider and `prefers-reduced-motion` handling
were all left as they were.

## Validation

| Gate                                 | Result |
| ------------------------------------ | ------ |
| `npm run typecheck` (`tsc --noEmit`) | Pass, zero errors |
| `npm run lint` (`eslint .`)          | Pass, zero errors and zero warnings |
| `npm run build`                      | Pass, 49 documents prerendered |
| `npm run start` smoke test           | Ten routes across all five locales return 200; `/hy` correctly 308s to `/`; unknown locale and unknown path both 404 |

Alias resolution was confirmed in the production build and at runtime, including
the new `@/lib/i18n/page` and `*.copy.ts` modules.

## Remaining technical debt

- **No test suite.** There are no tests and none were added. The highest-value
  targets if that changes are `lib/forms/photoUpload.ts`, where `sniffImageType`
  and the validators are pure and security-relevant, `lib/i18n/routes.ts` for
  `localePath` and `languageAlternates`, and the schema builders in
  `lib/seo/jsonld.ts`.
- **No Stylelint or Prettier config.** SCSS is consistent by hand. Adding
  Stylelint would make that enforceable rather than conventional.
- **Translation keys are structurally typed but not value-checked.** The five
  dictionaries satisfy one `Dictionary` interface, so a missing key is a compile
  error, but nothing guards against an empty string.
- **`PageHeader` still receives the whole dictionary.** It is a Server
  Component, so this costs nothing at runtime, but it is the same shape that was
  a real problem on the client side.
- **No total upload cap on the lead route.** Four files at 8 MB each is the
  effective ceiling; a whole-request cap would be tighter.
