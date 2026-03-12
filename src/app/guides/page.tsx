import Link from "next/link";
import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { getGuidesIndexCopy } from "@/lib/guides-content";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getGuidesIndexCopy(currentLang), "/guides");
}

export default async function GuidesPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getGuidesIndexCopy(currentLang);
    const textClass = currentLang === "ko" ? "font-korean break-keep" : "";

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro}>
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                <section className="rounded-4xl border border-white/12 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
                    <p className={`text-sm text-cyan-200/90 ${textClass}`}>{copy.updatedLabel}</p>
                    <p className={`mt-4 text-[15px] leading-8 text-white/72 ${textClass}`}>{copy.description}</p>
                </section>
                <aside className="rounded-4xl border border-cyan-400/18 bg-cyan-400/8 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
                    <h2 className={`text-lg font-semibold tracking-tight text-white ${textClass}`}>{copy.highlightsTitle}</h2>
                    <ul className="mt-5 space-y-3">
                        {copy.highlights.map((highlight) => (
                            <li key={highlight} className={`flex gap-3 text-sm leading-7 text-white/78 ${textClass}`}>
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {copy.cards.map((card) => (
                    <Link
                        key={card.href}
                        href={`${card.href}?lang=${currentLang}`}
                        className="group overflow-hidden rounded-4xl border border-white/12 bg-white/4.5 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all hover:bg-white/8 hover:-translate-y-1"
                    >
                        <span className={`inline-flex rounded-full border border-white/12 bg-white/7 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-cyan-200 ${textClass}`}>
                            {card.tag}
                        </span>
                        <h2 className={`mt-4 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-300 ${textClass}`}>{card.title}</h2>
                        <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 to-transparent transition-opacity group-hover:opacity-50" />
                        <p className={`mt-5 text-[15px] leading-8 text-white/70 ${textClass}`}>{card.summary}</p>
                    </Link>
                ))}
            </div>
        </StaticContentShell>
    );
}
