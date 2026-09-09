# Post-launch setup

Nothing here is done yet. No property is verified, no analytics account is
connected, and there are no placeholder ids anywhere in the codebase. This is
the list of what to do once the site is live on its real domain, and it must be
done by whoever owns the business accounts.

Do all of it **after** `NEXT_PUBLIC_SITE_URL` is set to the real origin and the
site has been rebuilt.

---

## Google Search Console

1. Add a property at [search.google.com/search-console](https://search.google.com/search-console).
   Prefer the **Domain** property, verified by DNS TXT record — it covers every
   subdomain and both protocols at once. Use the URL-prefix property only if you
   cannot edit DNS.
2. If you use URL-prefix verification with an HTML meta tag, put the token in
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and rebuild. The tag is only emitted
   when that variable has a value.
3. Submit `https://your-domain/sitemap.xml` under **Sitemaps**.
4. Use **URL Inspection** on the home page and one service page, and request
   indexing.
5. Check **Indexing → Pages** after a week. All 45 URLs should be indexed. If
   some show "Alternate page with proper canonical", confirm you are not serving
   both `www` and the apex.
6. Check **Enhancements** for the FAQ, breadcrumb and video results once they
   appear.
7. Set the international targeting expectation: hreflang handles language, so no
   country targeting is needed.

## Google Analytics 4

1. Create a GA4 property and copy the measurement id (`G-...`).
2. Set `NEXT_PUBLIC_GA4_ID` and rebuild.
3. In GA4, mark these as key events once they start arriving:
   `phone_click`, `map_click`, `directions_click`, `contact_form_submit`.
4. The remaining events are useful for behaviour, not conversion:
   `instagram_click`, `youtube_click`, `video_play`, `photo_upload_start`,
   `language_change`, `before_after_interaction`, `work_filter`.
5. Link the GA4 property to Search Console.

`phone_click` fires on every phone link on the site — header, hero, fact rail,
service sidebars, footer and the mobile bar. It measures intent to call, not
completed calls; nothing on a website can measure the latter.

## Google Business Profile

The site does not create, claim or reference a Business Profile, and no profile
should be fabricated. When the owner claims or updates the real one:

1. Use exactly the name, address and phone in `config/business.ts`. Any
   difference between the profile and the site weakens both.
2. Add the website URL, and the same Instagram and YouTube links.
3. Once the profile has real opening hours, put them in `OPENING_HOURS` in
   `config/business.ts` and rebuild. The location block and the
   `openingHoursSpecification` in schema both switch on automatically.
4. Once the map pin is placed, take the coordinates from it and set
   `COORDINATES`. That, and only that, is where `geo` should come from.

## Yandex

Yandex matters here: much of the local market searches in Russian.

1. **Yandex Webmaster** — add the site at
   [webmaster.yandex.com](https://webmaster.yandex.com). If you verify by meta
   tag, put the token in `NEXT_PUBLIC_YANDEX_VERIFICATION` and rebuild.
2. Submit the sitemap. `robots.txt` already carries a `Host` directive and an
   explicit `Yandex` user-agent block.
3. Set the site region to Abovyan / Kotayk in Webmaster, under
   **Site information → Regions**.
4. **Yandex Metrica** — create a counter, then set
   `NEXT_PUBLIC_YANDEX_METRICA_ID` to the numeric id and rebuild. Webvisor is
   off by default in this integration; turn it on only if you have a reason to
   record sessions and have told visitors.
5. Metrica goals: create one goal per event id listed under GA4 above. The
   integration reports them through `reachGoal` with the same names.
6. Consider switching the map to Yandex with `NEXT_PUBLIC_MAP_PROVIDER=yandex`
   if most visitors arrive from Yandex. Both providers are already wired and
   both are click-to-load.

## Bing Webmaster Tools

1. Add the site at [bing.com/webmasters](https://www.bing.com/webmasters). The
   fastest route is importing the verified property from Google Search Console.
2. For meta-tag verification, set `NEXT_PUBLIC_BING_VERIFICATION` and rebuild.
3. Submit the sitemap.
4. Bing Webmaster Tools also feeds results into Microsoft Copilot, so it is
   worth doing even though Bing traffic is small in the region.

**IndexNow** is not implemented, on purpose: it earns its keep on sites that
publish often, and this one changes rarely. If a blog is added later, Bing
Webmaster Tools can generate a key, and the ping is a single fetch from a
route handler after a content change.

## Microsoft Clarity

Optional. Set `NEXT_PUBLIC_CLARITY_ID` and rebuild. Clarity records session
replays, so decide deliberately whether you want that before switching it on.

## The photo form

The form ships switched off and says so plainly, because pretending to receive
messages nobody reads is worse than not offering the form.

To turn it on, point `LEAD_FORM_ENDPOINT` at a real inbox that accepts
`multipart/form-data` — a form-relay service, a Telegram bot webhook, or your
own handler. Then send a real test submission and confirm it arrives before
telling anyone the form works.

Validation is enforced server-side in `app/api/lead/route.ts`, not just in the
browser: file count, size, declared MIME type and extension are all re-checked,
filenames are regenerated rather than reused, and free-text fields are
length-capped. Nothing is written to the server's filesystem.

## A month in

- [ ] Search Console: 45 pages indexed, no canonical or hreflang warnings
- [ ] GA4: `phone_click` is arriving, and from which pages
- [ ] Yandex Webmaster: region set, sitemap read, pages indexed
- [ ] Ask the owner which search terms customers mention on the phone, and check
      those queries in Search Console
- [ ] Add any new before/after pairs the owner has published to
      `comparisons` in `content/works.ts`
