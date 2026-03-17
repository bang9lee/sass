import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Noto_Sans_KR, Cinzel } from "next/font/google";
import { AppRuntime } from "@/components/app-runtime";
import { LanguageProvider } from "@/components/language-provider";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { resolveSupportedLang } from "@/lib/site-content";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleAdSense } from "@/components/google-adsense";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const notoSansKR = Noto_Sans_KR({ weight: ["300", "400", "500", "700"], subsets: ["latin"], variable: "--font-korean" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://findcore.me'),
  applicationName: "FINDCORE",
  title: "Find My Aesthetic Core",
  description: "Discover your unique visual atmosphere and authentic personal color. Find your seasonal palette and aesthetic core.",
  keywords: ["Aesthetic", "Personal Color", "퍼스널컬러", "Color Analysis", "봄웜", "여름쿨", "가을웜", "겨울쿨", "Visual Identity"],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FINDCORE",
  },
  other: {
    "google-adsense-account": "ca-pub-7537131530412793"
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLang = resolveSupportedLang(cookieStore.get("lang")?.value);

  return (
    <html lang={initialLang} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${notoSansKR.variable} ${cinzel.variable} font-sans antialiased min-h-screen bg-black text-white overflow-x-hidden selection:bg-pink-500/30`}>
        <AppRuntime />
        {/* Cinematic Background - Hidden on mobile to prevent double-rendering and GPU overload */}
        <div className="hidden md:block fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Static Grain Texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay z-20 pointer-events-none" />

          {/* Aurora Effects */}
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/30 blur-[100px] animate-aurora translate-z-0" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/20 blur-[120px] animate-aurora animation-delay-4000 translate-z-0" />
          <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-pink-900/20 blur-[80px] animate-pulse-slow translate-z-0" />

          {/* Gradients */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
        </div>

        <main className="relative z-10 min-h-screen flex flex-col">
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <LanguageProvider initialLang={initialLang}>
              {children}
              <CookieConsent />
              <GoogleAdSense />
            </LanguageProvider>
          </Suspense>
        </main>
      </body>
    </html>
  );
}
