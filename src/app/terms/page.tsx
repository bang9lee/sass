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
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro} updatedLabel={copy.updatedLabel}>
            <div className="mx-auto max-w-3xl space-y-10 md:space-y-14 mt-4">
                {copy.sections.map((section) => (
                    <div
                        key={section.title}
                        className="group relative pl-6 md:pl-10"
                    >
                        {/* Vertical timeline line */}
                        <div className="absolute left-0 top-2 -bottom-10 w-px bg-white/5 group-hover:bg-cyan-500/30 transition-colors duration-500 group-last:bottom-0 group-last:bg-linear-to-b group-last:from-white/5 group-last:to-transparent" />
                        
                        {/* Glow dot */}
                        <div className="absolute left-[-3.5px] top-2.5 h-2 w-2 rounded-full border border-white/20 bg-black group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-500" />
                        
                        <h2 className={`text-lg md:text-xl font-semibold text-white tracking-tight mb-4 group-hover:text-cyan-50 transition-colors duration-300 ${textClass}`}>
                            {section.title}
                        </h2>
                        <p className={`text-[15px] md:text-base leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300 ${textClass}`}>
                            {section.body}
                        </p>
                    </div>
                ))}
            </div>
        </StaticContentShell>
    );
}
