import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['ko', 'en', 'zh', 'ja'] as const;
const supportedLocales = new Set<string>(SUPPORTED_LOCALES);
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    // 1. Skip if already has lang param or is a static asset/API
    if (
        searchParams.has('lang') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.') || // images, files
        pathname.startsWith('/api')
    ) {
        return NextResponse.next();
    }

    // 2. Detect Language from Headers
    const acceptLanguage = request.headers.get('accept-language') || '';
    let detectedLang = DEFAULT_LOCALE;

    // Simple priority check
    if (acceptLanguage.includes('ko')) detectedLang = 'ko';
    else if (acceptLanguage.includes('zh')) detectedLang = 'zh';
    else if (acceptLanguage.includes('ja')) detectedLang = 'ja';
    if (!supportedLocales.has(detectedLang)) {
        detectedLang = DEFAULT_LOCALE;
    }
    // English is default

    // 3. Redirect with lang parameter
    const url = request.nextUrl.clone();
    url.searchParams.set('lang', detectedLang);

    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
