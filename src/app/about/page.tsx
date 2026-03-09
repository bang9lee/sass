import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { buildPageMetadata, getAboutCopy, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getAboutCopy(currentLang));
}

export default async function AboutPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getAboutCopy(currentLang);

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro}>
            <section className="space-y-4">
                {copy.sections.map((section) => (
                    <div key={section.title} className="rounded-4xl border border-white/12 bg-white/4.5 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <h2 className="text-xl font-semibold tracking-tight text-white font-korean">{section.title}</h2>
                        <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 to-transparent" />
                        <p className="mt-5 text-[15px] leading-8 text-white/70 font-korean break-keep">{section.body}</p>
                    </div>
                ))}
            </section>
        </StaticContentShell>
    );
}
