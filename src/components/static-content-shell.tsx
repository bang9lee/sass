"use client";

import type { SupportedLang } from "@/lib/site-content";
import { Footer } from "@/components/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";

interface StaticContentShellProps {
    lang?: SupportedLang;
    title: string;
    intro: string;
    updatedLabel?: string;
    children: React.ReactNode;
}

export function StaticContentShell({
    title,
    intro,
    updatedLabel,
    children,
}: StaticContentShellProps) {
    const { lang } = useLanguage();
    const textClassName = lang === "ko" ? "font-korean break-keep" : "";

    return (
        <AuroraBackground className="justify-start pb-0">
            <div className="relative z-10 w-full min-h-dvh flex flex-col overflow-x-hidden">
                <SiteHeader
                    lang={lang}
                    position="sticky"
                    surfaceClassName="bg-black/20 backdrop-blur-xl border-b border-white/5"
                />

                <main className="relative z-10 flex-1 flex flex-col w-full justify-start items-center">
                    {/* Hero Section */}
                    <div className="relative w-full overflow-hidden flex flex-col items-center justify-center pt-24 pb-20 md:pt-32 md:pb-28 px-6">
                        {/* Premium Glassmorphic Glow */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <div className="w-[800px] h-[500px] bg-white/3 rounded-[100%] blur-[120px] mix-blend-screen" />
                            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent opacity-50" />
                            <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                        </div>

                        {/* Animated Grid Background */}
                        <div
                            className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none transition-opacity duration-1000"
                            style={{
                                backgroundImage: `radial-gradient(ellipse at center, transparent 20%, #000 100%), linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                                backgroundSize: `100% 100%, 40px 40px, 40px 40px`,
                            }}
                        />

                        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 md:space-y-8">
                            {updatedLabel && (
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden relative group transition-all duration-300 hover:bg-white/10">
                                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    <span className={`text-[11px] uppercase tracking-widest text-white/70 font-medium ${textClassName}`}>
                                        {updatedLabel}
                                    </span>
                                </div>
                            )}
                            
                            <h1 className={`text-4xl md:text-5xl lg:text-6xl tracking-tight text-white font-medium drop-shadow-sm leading-[1.15] ${textClassName}`}>
                                {title}
                            </h1>
                            
                            <p className={`max-w-xl mx-auto text-[15px] md:text-base leading-relaxed text-white/50 font-light ${textClassName}`}>
                                {intro}
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full max-w-4xl px-6 pb-24 relative z-20 space-y-8">
                        {children}
                    </div>
                </main>

                <Footer lang={lang} />
            </div>
        </AuroraBackground>
    );
}
