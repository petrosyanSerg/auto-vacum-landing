import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/lib/i18n/config';

const prefixed = locales.filter((l) => l !== defaultLocale);

/**
 * URL strategy: Armenian, the default locale, is served without a prefix.
 *
 *   /ru/works  -> passes through to app/[locale]/works
 *   /works     -> rewritten to /hy/works, so the address bar stays clean
 *   /hy/works  -> permanently redirected to /works, so there is exactly one
 *                 canonical URL per document and no duplicate for crawlers
 */
export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(defaultLocale.length + 1) || '/';
    return NextResponse.redirect(new URL(`${stripped}${search}`, request.url), 308);
  }

  if (prefixed.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}${search}`, request.url));
}

export const config = {
  matcher: [
    // Everything except Next internals, the SEO files, and anything with a file extension.
    '/((?!_next/|api/|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|.*\\.[\\w]+$).*)',
  ],
};
