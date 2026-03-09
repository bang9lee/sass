import Link from "next/link";
import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { buildPageMetadata, getGuidesIndexCopy, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getGuidesIndexCopy(currentLang));
}

export default async function GuidesPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getGuidesIndexCopy(currentLang);

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro}>
            <div className="grid gap-4 md:grid-cols-3">
                {copy.cards.map((card) => (
                    <Link
                        key={card.href}
                        href={`${card.href}?lang=${currentLang}`}
                        className="group overflow-hidden rounded-4xl border border-white/12 bg-white/4.5 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all hover:bg-white/8 hover:-translate-y-1"
                    >
                        <h2 className="text-xl font-semibold tracking-tight text-white font-korean transition-colors group-hover:text-cyan-300">{card.title}</h2>
                        <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 to-transparent transition-opacity group-hover:opacity-50" />
                        <p className="mt-5 text-[15px] leading-8 text-white/70 font-korean break-keep">{card.summary}</p>
                    </Link>
                ))}
            </div>
        </StaticContentShell>
    );
}
