"use client";

import Link from "next/link";
import { getFooterLabels, type SupportedLang } from "@/lib/site-content";
import { useLanguage } from "@/components/language-provider";
import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";

interface FooterProps {
    lang: SupportedLang;
    className?: string;
}

export function Footer({ lang: propLang, className = "" }: FooterProps) {
    const { lang: ctxLang } = useLanguage();
    const lang = ctxLang ?? propLang;
    const footer = getFooterLabels(lang);

    return (
        <footer className={`w-full shrink-0 border-t border-white/10 bg-black/30 px-8 py-6 backdrop-blur-sm relative ${className}`}>
            <div className="mx-auto grid max-w-6xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                <div className="hidden md:block text-left">
                    <Link 
                        href={`/?lang=${lang}`}
                        className="font-cinzel text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:text-cyan-200 transition-colors"
                    >
                        FINDCORE.ME
                    </Link>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white">
                    <Link href={`/about?lang=${lang}`} className="hover:text-cyan-200 transition-colors">{footer.about}</Link>
                    <Link href={`/guides?lang=${lang}`} className="hover:text-cyan-200 transition-colors">{footer.guides}</Link>
                    <Link href={`/privacy?lang=${lang}`} className="hover:text-cyan-200 transition-colors">{footer.privacy}</Link>
                    <Link href={`/terms?lang=${lang}`} className="hover:text-cyan-200 transition-colors">{footer.terms}</Link>
                </div>
                <div className="flex flex-col items-center md:items-end gap-1">
                    <a 
                        href={PUBLISHER_PROFILE.telegramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-[11px] text-white font-bold transition-colors hover:text-cyan-200"
                    >
                        <span className="font-cinzel tracking-wider">TELEGRAM {PUBLISHER_PROFILE.telegramHandle}</span>
                    </a>
                    <a 
                        href={`mailto:${PUBLISHER_PROFILE.email}`}
                        className="inline-flex items-center gap-2 text-[11px] text-white/50 transition-colors hover:text-cyan-200 font-medium"
                    >
                        {PUBLISHER_PROFILE.email}
                    </a>
                </div>
            </div>
        </footer>
    );
}
