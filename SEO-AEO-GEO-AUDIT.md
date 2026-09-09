# SEO / AEO / GEO audit

Audited and implemented against the production Next.js site for Auto Vacuum, a
paintless dent repair workshop in Abovyan, Armenia.

## Executive summary

The site arrived in strong shape. A previous pass had already built the parts
most projects are missing: one source of truth for business facts, a route
registry that drives navigation and the sitemap together, per-locale metadata
across five languages, reciprocal hreflang, and structured data that refuses to
invent values. There was no keyword stuffing to unwind and no fabricated trust
signals to remove.

What was missing was the connective tissue of the entity graph and the
governance around it. Structured data described the business, the site and the
services, but never the *documents*, so nothing tied a given URL to either. The
crawler policy was inherited rather than chosen. The portfolio, which is the
site's strongest evidence, was invisible to anything that could not look at
pictures. Those are now implemented.

### Scores

Assessed after implementation. The scale is "how completely does this site do
the thing", not a comparison to competitors.

| Area | Score | Note |
| --- | --- | --- |
| Technical SEO | 9.5 / 10 | 45 pages, all validated: canonical, hreflang, titles, headings |
| Structured data | 9.5 / 10 | 260 JSON-LD blocks, all valid, fully connected by `@id` |
| Entity SEO | 9 / 10 | Complete on-site; off-site corroboration is the owner's remaining work |
| AEO | 9 / 10 | Question-first content, server-rendered, quotable out of context |
| GEO | 9 / 10 | Honest limits and an explicit no-price answer, which is what makes it citable |
| Local SEO | 8 / 10 | NAP is exact everywhere; capped until a Business Profile confirms coordinates and hours |
| Content quality | 8.5 / 10 | Real, hedged, non-promotional; comparison content still absent |
| Performance | 9 / 10 | Server Components throughout, no SEO JavaScript, no third-party player until pressed |

Local SEO is capped at 8 by design. Coordinates, opening hours and a price band
are genuinely unpublished, so they are absent rather than guessed. Each is one
line in `config/business.ts` once verified.

---

## Problems found

1. **No document node in the graph.** `LocalBusiness`, `WebSite` and `Service`
   all existed, but no `WebPage`. A crawler could see that the business exists
   and that the site exists, with nothing stating what any single URL was about
   or that it belonged to either.
2. **No contact point in the schema.** The phone was in the visible copy on
   every page and in `telephone`, but there was no `ContactPoint` saying which
   languages it is answered in, which is the fact that matters to a Kazakh or
   Georgian reader deciding whether to call.
3. **The portfolio was not machine-readable.** Eleven before/after frames, each
   cut from a real video, with authored per-locale captions and a known panel
   and repair state, and none of it exposed. This is the site's best evidence
   and it was invisible to text-only consumers.
4. **The crawler policy was accidental.** The robots file allowed everything via
   the wildcard rule, which is the right outcome, but by default rather than by
   decision, and with nothing recorded about why.
5. **Service card photos had empty alt.** Real photographs of the workshop's own
   work marked as decorative, forfeiting image search for four images across
   every locale.
6. **The 404 was indexable.** No noindex directive.
7. **The API route was crawlable.** The lead endpoint accepts crawler requests
   for no benefit.
8. **No off-site governance.** Nothing told the owner which external profiles
   corroborate the entity, or that the name, address and phone have to match
   byte for byte.

---

## Implemented changes

### Entity graph

`webPageSchema()` in `lib/seo/jsonld.ts` emits a document node on all 45 pages,
narrowing to `ContactPage` on contact and `CollectionPage` on the services and
works indexes. Each node carries a stable `@id`, declares which website it is
part of and which business it is about, and states its own language. The graph
is now closed: a document points at the site and the business, the site points
back at the business as publisher, and every service points at the business as
provider.

Added to the business node: a `ContactPoint` carrying the phone and the five
languages it is answered in, `knowsLanguage`, and `employee` naming the
technician, verified from the owner's own List.am profile and YouTube channel
rather than inferred.

Added to each service node: `areaServed` widened from the province alone to the
city and the province, and an `availableChannel` describing the only two ways to
actually book, which are the phone and the page itself.

### Portfolio as evidence

`worksGallerySchema()` emits an `ImageGallery` on the works page. Each of the
eleven frames becomes an `ImageObject` carrying its localised title and caption,
the panel and repair state in words, its real dimensions, the business as
creator, and a link back to the source video. An assistant that can only read
text can now state what visual proof exists and what it shows.

### Crawler policy

The robots route was rewritten to allow fourteen answer-engine and search
crawlers by name, with the reasoning recorded in `docs/ai-crawler-policy.md`.
The named agents are GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
Claude-User, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended,
Applebot-Extended, CCBot, Bingbot and YandexBot. Google-Extended matters most:
it is the grounding signal for AI Overviews and is separate from Googlebot.

The lead endpoint was added to the disallow list. Stylesheets, scripts and
images stay crawlable, because blocking them stops a renderer seeing the page as
a visitor does.

### Smaller fixes

- Service card images now carry the same authored per-locale caption the gallery
  uses, instead of an empty alt.
- The 404 page is now noindex, follow.
- Video posters keep an empty alt deliberately. Each sits inside a button whose
  accessible label names the video, with a visible caption beside it. Alt text
  there would double-announce.

---

## Verification

Run against the real build output, not against intent. The numbers below are
reproducible with `npm run build`.

| Check | Result |
| --- | --- |
| Pages built | 45, being 9 documents across 5 locales |
| JSON-LD blocks emitted | 260, all parse, all carry a context |
| Pages with a WebPage-family node | 45 of 45 |
| Canonical present, absolute, self-referencing | 45 of 45 |
| hreflang entries per page | 6, being five locales plus x-default, on all 45 |
| hreflang reciprocity | every A to B has a matching B to A |
| Duplicate titles | none across 45 pages |
| Duplicate canonicals | none |
| Level-one headings per page | exactly 1 on all 45 |
| Meta description | present on all 45 |
| Sitemap URLs | 45, exactly matching the canonical set |
| Business name, address and phone in server HTML | present on all 45 |
| FAQ schema against visible content | all 20 questions on the FAQ page visible in the HTML |
| Orphan pages | none; the least-linked page has 11 inbound internal links |
| Images without alt | 90, all video posters, decorative by design |
| Typecheck, lint, build | clean |

The only file flagged by the crawl checks is the internal Next.js error
boundary, which is not a routable document.

### Structured data inventory

| Type | Pages |
| --- | --- |
| `AutoRepair` plus `LocalBusiness` | 45 |
| `WebSite` | 45 |
| `WebPage` | 30 |
| `CollectionPage` | 10 |
| `ContactPage` | 5 |
| `FAQPage` | 30 |
| `Service` | 40 |
| `BreadcrumbList` | 40 |
| `ItemList` of `VideoObject` | 10 |
| `ImageGallery` of `ImageObject` | 5 |

Absent on purpose: geographic coordinates, opening hours, price range and
aggregate rating. None is published by the business. Inventing any of them is
both a trust problem and a structured-data violation. List.am shows a 5.0 rating
built from a single review, which is why it is rendered as a linked source line
and not as an aggregate rating. One review is not an aggregate.

---

## AEO

The site was already written to be quoted, and that survived the audit intact.
FAQ answers stand alone out of context. The pricing answer explains what a quote
depends on rather than inventing a number, which is precisely what makes it safe
for an assistant to repeat. Suitability answers are hedged, saying many dents
but not when the paint is cracked, so a model has something honest to say about
the limits rather than only the sales case.

Structurally, the FAQ is built on disclosure elements so answers are in the HTML
with no JavaScript, there is one top-level heading per page, headings are
ordered, and the landmark elements are used for what they mean. The FAQ page
collects the general set plus every service-specific question into a single
answerable document of 20 questions.

Every fact an answer engine needs is server-rendered. Nothing about the
business, its services, its location or its phone sits behind a client
interaction.

## GEO

The entity is stated the same way in every language and on every surface,
because the header, footer, contact block, service pages, schema and map links
all read from `config/business.ts`. There is no second spelling of the address
anywhere in the codebase.

What makes this site citable rather than merely present is what it refuses to
say. No invented price, no invented hours, no invented rating, no fabricated
years of experience or count of cars repaired. A generative engine that grounds
an answer here cannot be led into a false claim about the business.

## Multilingual

Five locales, being Armenian as the unprefixed default, plus Russian, English,
Kazakh and Georgian, each with authored copy rather than runtime translation.
The dictionary is a TypeScript contract, so a missing string is a build error.
URLs stay in Latin script across all five, so a link pasted into a chat still
works. The Armenian prefix permanently redirects to the unprefixed path, giving
exactly one canonical URL per document. Each locale canonicalises to itself, and
Armenian doubles as x-default because it is what the bare domain serves.

## Performance

Nothing added here costs the browser anything. Structured data is emitted by a
Server Component, so it is part of the HTML document rather than something the
browser executes. No library was added for SEO. The YouTube player is only
inserted into the cell a visitor actually presses, through the no-cookie host.
Fonts declare only the subsets each script needs, so a Russian visitor
downloads no Georgian glyphs. Images have explicit dimensions, so the gallery
does not shift as it loads.

## Accessibility

Skip link, an accordion that is keyboard operable and findable with in-page
search, breadcrumbs rendered from the same array that feeds the breadcrumb
markup, the current crumb marked as such, an accessible label on every phone
link, and decorative images correctly marked as decorative.

---

## Remaining manual actions

None of these can be done from the codebase. They need credentials or a physical
verification the owner controls.

**Blocking launch**

- [ ] Set `NEXT_PUBLIC_SITE_URL` in the deployment environment. Canonicals,
      hreflang, the sitemap and every schema identifier are built from it, and
      it currently falls back to a hardcoded default.

**Verification, needs account access**

- [ ] Google Search Console: verify, and submit the sitemap
- [ ] Yandex Webmaster: verify, and submit the sitemap
- [ ] Bing Webmaster Tools: verify, and submit
- [ ] Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION`
      and `NEXT_PUBLIC_BING_VERIFICATION`. The meta tags appear only once a real
      value is supplied

**Business profiles, needs the owner**

- [ ] Google Business Profile: verify the address. This is the single
      highest-value action remaining for a local workshop
- [ ] Yandex Business
- [ ] Bing Places
- [ ] Add the website link to the YouTube channel, so the social link is
      corroborated from both ends
- [ ] Put the address and phone in the Instagram bio

See `docs/external-entity-signals.md` for the exact strings to paste. They must
match byte for byte.

**Feeds back into the site once verified**

- [ ] `COORDINATES` in `config/business.ts`, from the confirmed map pin. Unlocks
      geographic coordinates in the schema
- [ ] `OPENING_HOURS`, which unlocks the opening-hours specification and replaces
      the "call to confirm" line
- [ ] `LEAD_FORM_ENDPOINT`. The photo-assessment form is disabled and says so
      until an inbox exists
- [ ] Analytics identifiers, if wanted: GA4, Yandex Metrica, Clarity

**Ongoing**

- [ ] Work through `AEO-GEO-TEST-QUERIES.md` about a month after launch, and
      monthly after that

---

## Not done, and why

**Comparison content.** A page on paintless repair versus conventional body
repair, and one on what determines a price, are genuine gaps. Both are listed in
`docs/seo-checklist.md` as future work. They are not implemented here because
each needs authored copy in five languages, and the workshop's voice in those
languages was established by a human writer. Machine-drafting Kazakh and
Georgian body copy into a site whose credibility rests on sounding like the
person who answers the phone would trade a real asset for a marginal one. These
should be written, then added. The translation files and the route registry make
it a small change once the copy exists.

**Localised URL slugs.** Deliberately rejected earlier and left rejected. They
would fragment one document across five URL shapes and break any link a customer
pastes into a chat.
