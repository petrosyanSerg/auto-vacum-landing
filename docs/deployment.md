# Deployment

## Requirements

- Node.js 20 or newer (developed on 24)
- A host that runs a Node server. The site is almost entirely static, but
  `proxy.ts` and `/api/lead` need a runtime, so a pure static export will not
  work as-is.

## Environment

Copy `.env.example` and fill in what applies. Everything is optional except the
site URL, which must be set before launch or canonical URLs, hreflang, the
sitemap and Open Graph tags will all point at the placeholder domain.

```
NEXT_PUBLIC_SITE_URL=https://your-real-domain.am
```

The variables are documented inline in `.env.example`. Two rules worth
repeating:

- `LEAD_FORM_ENDPOINT` is server-side only. Never give it a `NEXT_PUBLIC_`
  prefix, or the destination becomes readable in the browser bundle.
- Leave every analytics and verification variable empty until you have a real
  value. Empty means the tracker or meta tag is simply not emitted — there are
  no placeholder ids anywhere in this codebase.

## Build

```bash
npm ci
npm run assets:images   # only if _source-media has changed
npm run assets:brand    # only if the icon or social card has changed
npm run check           # typecheck, lint, build
npm run start           # serve the production build
```

`public/` is committed, so a normal deploy does not need the asset scripts. They
exist to regenerate the optimised stills and the social card from source when
the owner publishes new footage.

## Vercel

Connect the repository and it works with defaults: build `next build`, output
handled automatically. Add the environment variables in Project Settings, then
redeploy — `NEXT_PUBLIC_*` values are inlined at build time, so changing one
requires a rebuild, not just a restart.

## Any other Node host

```bash
npm ci --omit=dev && npm run build && npm run start
```

Serve behind a reverse proxy on port 3000. If the host supports Next.js
standalone output, add `output: 'standalone'` to `next.config.ts` for a smaller
runtime image.

## Domain and DNS

1. Point the domain at the host.
2. Set `NEXT_PUBLIC_SITE_URL` to the exact origin you want indexed, including
   `https://` and with no trailing slash.
3. Pick one hostname and redirect the other. If `www` is canonical, redirect the
   apex to it at the host or CDN level, and match `NEXT_PUBLIC_SITE_URL` to the
   choice. Serving both is the single most common cause of duplicate-content
   problems on a small site.
4. Rebuild after changing the variable.

## Response headers

`next.config.ts` sets `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options` and a restrictive `Permissions-Policy` on every response, and
a one-year immutable cache on `/images/*`. If the host injects its own security
headers, check they do not conflict — in particular, a `Content-Security-Policy`
would need to allow `youtube-nocookie.com` frames and, if the map is enabled,
the chosen map provider.

## Before announcing the site

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real origin, and rebuilt
- [ ] `/robots.txt` and `/sitemap.xml` both load and show the real domain
- [ ] Phone links dial correctly on a real phone, not just a desktop browser
- [ ] The Google Maps directions link opens the right place
- [ ] `LEAD_FORM_ENDPOINT` either configured and tested end to end, or left
      empty so the form honestly says it is switched off
- [ ] The owner has confirmed the address, phone and opening hours are current
