import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { buildPageMetadata, getTermsCopy, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getTermsCopy(currentLang), "/terms");
}

export default async function TermsPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getTermsCopy(currentLang);
    const textClass = currentLang === "ko" ? "font-korean break-keep" : "";

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro}>
            <p className={`-mt-4 text-sm leading-7 text-white/65 ${textClass}`}>{copy.updatedLabel}</p>
            <section className="space-y-4">
                {copy.sections.map((section) => (
                    <div key={section.title} className="rounded-4xl border border-white/12 bg-white/4.5 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <h2 className={`text-xl font-semibold tracking-tight text-white ${textClass}`}>{section.title}</h2>
                        <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 to-transparent" />
                        <p className={`mt-5 text-[15px] leading-8 text-white/70 whitespace-pre-wrap ${textClass}`}>{section.body}</p>
                    </div>
                ))}
            </section>
        </StaticContentShell>
    );
}
