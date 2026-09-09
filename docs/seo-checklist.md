# SEO

## Implemented

**Technical**

- Unique title and description per page per locale, from the Metadata API. No
  two of the 45 pages share a title.
- Canonical URL on every page, absolute, one per document.
- Full hreflang set on every page and in every sitemap entry: five locales plus
  `x-default` pointing at Armenian.
- `sitemap.xml` generated from the same route registry the navigation reads, so
  a page cannot ship in the menu while missing from the sitemap.
- `robots.txt` with an explicit Yandex block and a `Host` directive.
- `manifest.webmanifest`, SVG favicon, 180px Apple touch icon.
- Open Graph and Twitter card on every page, with a 1200×630 preview image.
- Semantic HTML: one `h1` per page, ordered headings, `main`/`header`/`nav`/
  `section`/`article`/`footer`/`address` used for what they mean.
- Breadcrumbs on every inner page, rendered from the same array that feeds
  `BreadcrumbList`, so markup and display cannot diverge.
- Descriptive image filenames (`roof-panel-restored.webp`, not `IMG_1234.jpg`),
  alt text, explicit width and height on every image.

**Structured data** — only types and properties that genuinely describe the
business:

| Type | Where |
| --- | --- |
| `AutoRepair` + `LocalBusiness` | every page, via the layout |
| `WebSite` | every page |
| `Service` | services index and each service page |
| `FAQPage` | home, FAQ page, each service page |
| `BreadcrumbList` | every inner page |
| `ItemList` of `VideoObject` | home and works |

Absent by design: `geo`, `openingHoursSpecification`, `priceRange`,
`aggregateRating`. None of those is published by the business, and inventing
them is both a trust problem and a structured-data violation.

**Local**

- NAP is identical in the visible copy, the footer, the schema and the map
  links, because all four read from `config/business.ts`.
- Address localised per language, so an Armenian visitor sees
  Սևանի փ. 37/1 and a Russian visitor sees ул. Севани 37/1, while the schema
  matches the page language.
- `areaServed` covers the city and the province.
- The phone number appears in the header, the hero, the fact rail, every service
  page, the location block, the footer, and the mobile bar. It is never more
  than a thumb away.

**Answer engines**

The site is written to be quoted. Each FAQ answer stands alone out of context,
the entity is defined plainly (who, what, where, which services), and the
pricing answer explains what a quote depends on rather than inventing a number.
The FAQ page collects the general questions plus every service-specific one in a
single answerable document.

## Verify after launch

- [ ] Rich Results Test on the home page, a service page and the FAQ page
- [ ] Schema Markup Validator finds no errors
- [ ] Every canonical resolves to itself, not to a redirect
- [ ] `/hy/` 308-redirects to `/`, and `/hy/works` to `/works`
- [ ] hreflang is reciprocal: each locale lists all five plus `x-default`
- [ ] Mobile-friendly test passes
- [ ] Core Web Vitals in the green in PageSpeed Insights on mobile

## Keeping it that way

- New page? Add it to `lib/i18n/routes.ts`. Navigation, hreflang and the sitemap
  follow automatically.
- New service? Add the slug in `content/services.ts` and the copy in all five
  translation files. TypeScript will not let you forget a locale.
- Never reuse a meta description across pages.
- Keep hedged language ("often", "when suitable", "usually") in the copy.
  Absolute claims are both a credibility problem and a claim the workshop cannot
  stand behind on the phone.

## Content that could be added later

Each of these is a landing page a customer actually searches for, and each has
enough substance to stand on its own:

- PDR compared with conventional body repair
- Why factory paint is worth keeping
- How hail damage is assessed and repaired
- Which dents suit paintless repair and which do not
- What determines the price of a dent repair
