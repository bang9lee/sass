import { NextResponse, type NextRequest } from "next/server";

const SUPPORTED_LANGS = ["ko", "en", "zh", "ja"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];
type LangSource = "auto" | "user";
const DEFAULT_LANG: SupportedLang = "en";
const SUPPORTED_LANG_SET = new Set<string>(SUPPORTED_LANGS);
const LANG_COOKIE = "lang";
const LANG_SOURCE_COOKIE = "lang_source";
const COUNTRY_LANG_MAP: Partial<Record<string, SupportedLang>> = {
  KR: "ko",
  KP: "ko",
  JP: "ja",
  CN: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
};

function normalizeLang(value: string | null | undefined): SupportedLang | null {
  if (!value) return null;
  const base = value.toLowerCase().split("-")[0];
  return SUPPORTED_LANG_SET.has(base) ? (base as SupportedLang) : null;
}

function normalizeLangSource(value: string | null | undefined): LangSource | null {
  return value === "auto" || value === "user" ? value : null;
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

function detectLangFromCountry(request: NextRequest): SupportedLang | null {
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-geo-country");

  if (!country) return null;
  return COUNTRY_LANG_MAP[country.toUpperCase()] ?? null;
}

function setLangCookies(response: NextResponse, lang: SupportedLang, source: LangSource) {
  response.cookies.set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  response.cookies.set(LANG_SOURCE_COOKIE, source, {
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
  const cookieLang = normalizeLang(request.cookies.get(LANG_COOKIE)?.value);
  const cookieSource = normalizeLangSource(request.cookies.get(LANG_SOURCE_COOKIE)?.value);

  if (queryLang) {
    const source: LangSource =
      cookieSource === "auto" && cookieLang === queryLang ? "auto" : "user";
    return setLangCookies(NextResponse.next(), queryLang, source);
  }

  if (cookieLang && cookieSource === "user") {
    const url = request.nextUrl.clone();
    url.searchParams.set("lang", cookieLang);
    return setLangCookies(NextResponse.redirect(url), cookieLang, "user");
  }

  const countryLang = detectLangFromCountry(request);
  const headerLang = detectLangFromHeader(request.headers.get("accept-language"));
  const detectedLang = countryLang ?? headerLang ?? cookieLang ?? DEFAULT_LANG;

  const url = request.nextUrl.clone();
  url.searchParams.set("lang", detectedLang);
  return setLangCookies(NextResponse.redirect(url), detectedLang, "auto");
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
