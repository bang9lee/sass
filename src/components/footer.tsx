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
        <footer className={`w-full shrink-0 border-t border-white/10 bg-black/30 px-8 py-4 md:py-5 backdrop-blur-sm relative ${className}`}>
            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl">
                <div className="hidden md:flex items-center text-left h-full">
                    <Link 
                        href={`/?lang=${lang}`}
                        className="font-cinzel text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:text-amber-500 transition-colors leading-none pb-px"
                    >
                        FINDCORE.ME
                    </Link>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] text-white/80 font-medium leading-none">
                    <Link href={`/about?lang=${lang}`} className="hover:text-amber-500 transition-colors py-1">{footer.about}</Link>
                    <Link href={`/guides?lang=${lang}`} className="hover:text-amber-500 transition-colors py-1">{footer.guides}</Link>
                    <Link href={`/privacy?lang=${lang}`} className="hover:text-amber-500 transition-colors py-1">{footer.privacy}</Link>
                    <Link href={`/terms?lang=${lang}`} className="hover:text-amber-500 transition-colors py-1">{footer.terms}</Link>
                </div>
                <div className="flex flex-col items-center md:items-end justify-center gap-1 leading-none">
                    <a 
                        href={PUBLISHER_PROFILE.telegramUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-[11px] text-white font-bold transition-colors hover:text-amber-500 leading-none"
                    >
                        <span className="font-cinzel tracking-widest uppercase pb-px">TELEGRAM {PUBLISHER_PROFILE.telegramHandle}</span>
                    </a>
                    <a 
                        href={`mailto:${PUBLISHER_PROFILE.email}`}
                        className="inline-flex items-center gap-2 text-[11px] text-white/40 transition-colors hover:text-amber-500 font-medium leading-none"
                    >
                        {PUBLISHER_PROFILE.email}
                    </a>
                </div>
            </div>
        </footer>
    );
}
