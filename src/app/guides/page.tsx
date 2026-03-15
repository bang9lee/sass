import Link from "next/link";
import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { getGuidesIndexCopy } from "@/lib/guides-content";
import { buildPageMetadata, resolveSupportedLang } from "@/lib/site-content";
import { Camera, BookOpen, Brain, MessageCircleQuestion } from "lucide-react";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getGuidesIndexCopy(currentLang), "/guides");
}

function getTagConfig(tag: string) {
    const key = tag.toLowerCase();
    if (key.includes("capture") || key.includes("촬영") || key.includes("拍摄") || key.includes("撮影")) {
        return { color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300", Icon: Camera, glow: "from-emerald-500/10" };
    }
    if (key.includes("interpretation") || key.includes("해석") || key.includes("解读") || key.includes("解釈")) {
        return { color: "border-amber-500/20 bg-amber-500/10 text-amber-300", Icon: BookOpen, glow: "from-amber-500/10" };
    }
    if (key.includes("methodology") || key.includes("방법론") || key.includes("方法论") || key.includes("方法論")) {
        return { color: "border-purple-500/20 bg-purple-500/10 text-purple-300", Icon: Brain, glow: "from-purple-500/10" };
    }
    if (key.includes("faq") || key.includes("질문") || key.includes("问题") || key.includes("質問")) {
        return { color: "border-blue-500/20 bg-blue-500/10 text-blue-300", Icon: MessageCircleQuestion, glow: "from-blue-500/10" };
    }
    return { color: "border-white/12 bg-white/5 text-cyan-200", Icon: BookOpen, glow: "from-cyan-500/10" };
}

export default async function GuidesPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getGuidesIndexCopy(currentLang);
    const textClass = currentLang === "ko" ? "font-korean break-keep" : "";

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro} updatedLabel={copy.updatedLabel}>
            {/* Highlights banner */}
            <div className="relative rounded-4xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 to-transparent p-6 sm:p-8 overflow-hidden group transition-all duration-500 hover:border-cyan-500/30">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className={`text-xl font-semibold text-white tracking-tight ${textClass}`}>{copy.highlightsTitle}</h2>
                        <p className={`mt-2 text-[15px] leading-relaxed text-white/60 ${textClass} max-w-2xl`}>{copy.description}</p>
                        <div className="mt-5 flex flex-wrap gap-2.5">
                            {copy.highlights.map((highlight) => (
                                <span
                                    key={highlight}
                                    className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[13px] text-white/70 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white ${textClass}`}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.6)]" />
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Guide cards */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-4">
                {copy.cards.map((card) => {
                    const tagConf = getTagConfig(card.tag);
                    const Icon = tagConf.Icon;

                    return (
                        <Link
                            key={card.href}
                            href={`${card.href}?lang=${currentLang}`}
                            className="group relative flex flex-col rounded-4xl border border-white/10 bg-white/3 p-6 sm:p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1.5 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${tagConf.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-5">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${tagConf.color} backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-widest font-semibold backdrop-blur-md ${tagConf.color}`}>
                                        {card.tag}
                                    </span>
                                </div>
                                <h2 className={`text-lg font-bold tracking-tight text-white mb-3 group-hover:text-cyan-50 transition-colors ${textClass}`}>
                                    {card.title}
                                </h2>
                                <p className={`flex-1 text-[15px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors ${textClass}`}>
                                    {card.summary}
                                </p>
                                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-cyan-400 transition-colors">
                                    <span className="tracking-wide">READ GUIDE</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </StaticContentShell>
    );
}
