# External entity signals

The site is now the clearest source about this business. Search engines and
assistants corroborate what a site says against other places the same business
appears. Those places are off-site, so they are the owner's job, not the code's.

## The one rule

The name, address and phone must be **byte-identical** everywhere. Not
"basically the same" — identical. A profile saying "Sevani 37/1" and another
saying "ул. Севани, д. 37/1" can be read as two different businesses.

Copy these values exactly. They are the same ones `config/business.ts` renders.

| Field | Value |
| --- | --- |
| Name | Auto Vacuum |
| Phone | 099 22 95 90 · international `+374 99 229590` |
| Address (hy) | Սևանի փ. 37/1, 8-րդ միկրոշրջան, Աբովյան, Կոտայքի մարզ |
| Address (ru) | ул. Севани 37/1, 8-й микрорайон, Абовян, Котайкская область |
| Address (en) | 37/1 Sevan St., 8th microdistrict, Abovyan, Kotayk Province |
| Website | the live domain, with `https://` and no trailing slash |
| Category | Auto body shop / paintless dent repair |

## Where to maintain it

Ordered by how much each one moves the needle for this business.

1. **Google Business Profile** — the single highest-value listing. It feeds Maps,
   the local pack, and AI Overviews for "near me" questions. Verify the address,
   set the category, add the real opening hours, and upload the workshop's own
   before/after photos.
2. **Yandex Business** — Yandex has real share in this region. Same data.
3. **List.am** — already live, and already linked from the site's `sameAs`. Keep
   the phone and address on the listings matching the table above.
4. **Instagram `@auto.vacuum_`** — already linked. Put the address and phone in
   the bio, and the website link in the profile field, so the profile
   corroborates the site.
5. **YouTube channel** — already linked. Add the website to the channel's links
   section. This is what turns the channel into a confirmed `sameAs` rather than
   an unverified claim.
6. **Bing Places** — cheap to do, feeds Copilot.
7. **Local Armenian directories** — only ones a person would actually use. A
   listing on a site nobody reads is not a signal.

## What not to do

- Do not create listings in cities where the workshop does not operate.
- Do not invent a second phone number for tracking. It breaks NAP consistency,
  which costs more than the attribution data is worth.
- Do not solicit reviews with an incentive. Fake or paid reviews are the fastest
  way to lose a Business Profile.

## Feeding verified data back into the site

Three values are deliberately absent from the site because nothing published
confirms them. Once a Google Business Profile is verified, they become real, and
each is a one-line edit in `config/business.ts`:

| Once verified | Edit | What appears |
| --- | --- | --- |
| Map pin coordinates | `COORDINATES` | `geo` in LocalBusiness schema |
| Opening hours | `OPENING_HOURS` | `openingHoursSpecification`, and the location block stops saying "call to confirm" |
| A real price band | `PRICE_RANGE` | `priceRange` |

Do not fill any of them with a guess. Every consumer in the codebase already
handles `null` correctly, so leaving them empty costs nothing and is honest.
