import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LOCALES = ['ko', 'en', 'zh', 'ja']
const DEFAULT_LOCALE = 'en'

// Simple Accept-Language parser
function getPreferredLocale(acceptLanguage: string | null): string {
    if (!acceptLanguage) return DEFAULT_LOCALE

    // Example: "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
    const languages = acceptLanguage.split(',').map((lang) => {
        const [tag, qValue] = lang.split(';')
        const q = qValue ? parseFloat(qValue.replace('q=', '')) : 1.0
        return { tag: tag.trim(), q }
    })

    // Sort by quality
    languages.sort((a, b) => b.q - a.q)

    for (const lang of languages) {
        const code = lang.tag.split('-')[0].toLowerCase()
        if (SUPPORTED_LOCALES.includes(code)) {
            return code
        }
    }

    return DEFAULT_LOCALE
}

export default function proxy(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl

    // Skip internal paths and static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') // file with extension (favicon.ico, images, etc.)
    ) {
        return NextResponse.next()
    }

    // Check if lang param is already present
    if (searchParams.has('lang')) {
        return NextResponse.next()
    }

    // Detect language
    const acceptLanguage = request.headers.get('accept-language')
    const locale = getPreferredLocale(acceptLanguage)

    // Redirect with lang param
    const url = request.nextUrl.clone()
    url.searchParams.set('lang', locale)

    return NextResponse.redirect(url)
}

export const config = {
    matcher: [
        // Match all request paths except for the ones starting with:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
