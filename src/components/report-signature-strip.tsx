import Link from "next/link";
import type { SupportedLang } from "@/lib/site-content";

export type ReportSignatureStripProps = {
    lang: SupportedLang;
    homeHref?: string;
};

export function ReportSignatureStrip({
    lang,
    homeHref = `/?lang=${lang}`,
}: ReportSignatureStripProps) {
    return (
        <div className="w-full bg-[#050505] py-5 px-6 flex flex-wrap items-center justify-between gap-y-4 border-t border-white/5">
            <Link
                href={homeHref}
                className="footer-domain font-cinzel text-white text-[10px] uppercase tracking-[0.3em] font-bold"
            >
                FINDCORE.ME
            </Link>
            <a
                href="https://t.me/todayshelp"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
            >
                <span className="footer-telegram-label font-cinzel text-[10px] tracking-widest uppercase font-bold">
                    Telegram
                </span>
                <span className="footer-telegram-id font-cinzel text-[10px] font-bold text-white/90">@todayshelp</span>
            </a>
        </div>
    );
}
