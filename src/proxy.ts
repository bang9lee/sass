import { NextResponse, type NextRequest } from "next/server";

const SUPPORTED_LANGS = ["ko", "en", "zh", "ja"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];
const DEFAULT_LANG: SupportedLang = "en";
const SUPPORTED_LANG_SET = new Set<string>(SUPPORTED_LANGS);

function normalizeLang(value: string | null | undefined): SupportedLang | null {
  if (!value) return null;
  const base = value.toLowerCase().split("-")[0];
  return SUPPORTED_LANG_SET.has(base) ? (base as SupportedLang) : null;
}

function detectLangFromHeader(acceptLanguage: string | null): SupportedLang | null {
  if (!acceptLanguage) return null;
  const tokens = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0])
    .filter(Boolean);

  for (const token of tokens) {
    const normalized = normalizeLang(token);
    if (normalized) return normalized;
  }
  return null;
}

function setLangCookie(response: NextResponse, lang: SupportedLang) {
  response.cookies.set("lang", lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export default function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const queryLang = normalizeLang(searchParams.get("lang"));
  if (queryLang) {
    return setLangCookie(NextResponse.next(), queryLang);
  }

  const cookieLang = normalizeLang(request.cookies.get("lang")?.value);
  const headerLang = detectLangFromHeader(request.headers.get("accept-language"));
  const detectedLang = cookieLang ?? headerLang ?? DEFAULT_LANG;

  const url = request.nextUrl.clone();
  url.searchParams.set("lang", detectedLang);
  return setLangCookie(NextResponse.redirect(url), detectedLang);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
