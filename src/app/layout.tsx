import type { Metadata } from "next";
import { Inter, Playfair_Display, Gowun_Batang, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const gowun = Gowun_Batang({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-gowun" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://sass-opal-theta.vercel.app'),
  title: "Find My Aesthetic Core",
  description: "Discover your unique visual atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${gowun.variable} ${cinzel.variable} font-sans antialiased min-h-screen bg-black text-white overflow-x-hidden selection:bg-pink-500/30`}>
        {/* Cinematic Background - Hidden on mobile to prevent double-rendering and GPU overload */}
        <div className="hidden md:block fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Static Grain Texture */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay z-20 pointer-events-none" />

          {/* Aurora Effects */}
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/30 blur-[100px] animate-aurora translate-z-0" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/20 blur-[120px] animate-aurora animation-delay-4000 translate-z-0" />
          <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-pink-900/20 blur-[80px] animate-pulse-slow translate-z-0" />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        </div>

        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
