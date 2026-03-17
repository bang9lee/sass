"use client";

import { MagazineArticle } from "@/lib/magazine-content";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";

interface MagazineArticleClientProps {
    article: MagazineArticle;
}

export function MagazineArticleClient({ article }: MagazineArticleClientProps) {
    const { lang } = useLanguage();
    const isKorean = lang === "ko";

    return (
        <div className="min-h-screen bg-black text-white flex flex-col overflow-x-hidden">
            <SiteHeader
                lang={lang}
                position="sticky"
                surfaceClassName="bg-black/80 backdrop-blur-xl border-b border-white/5 z-50"
            />

            <main className="flex-1 pb-20">
                {/* Clean Left-Aligned Header */}
                <div className="max-w-2xl mx-auto px-6 pt-12 pb-8">
                    <Link
                        href={`/?lang=${lang}#magazine`}
                        className="inline-flex items-center gap-1 text-zinc-500 hover:text-white transition-colors text-[11px] font-semibold tracking-tight mb-8"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        {lang === 'ko' ? "매거진 목록으로" : "Back to Archive"}
                    </Link>

                    <div className="flex items-center gap-3 text-[11px] font-bold tracking-tight text-amber-500 mb-4">
                        <span>{article.category[lang]}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                        <span className="text-zinc-500">{article.date}</span>
                    </div>

                    <h1 className={`text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-4 antialiased ${isKorean ? "font-korean" : "font-sans"}`}>
                        {article.title[lang]}
                    </h1>

                    <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed antialiased">
                        {article.description[lang]}
                    </p>
                </div>

                {/* Significantly Smaller Featured Image */}
                <div className="max-w-2xl mx-auto px-6 mb-10">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                        <Image
                            src={article.image}
                            alt={article.title[lang]}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 700px"
                        />
                    </div>
                </div>

                {/* Standardized Content Column - Aligned with Header/Image */}
                <div className="max-w-2xl mx-auto px-6">
                    <article className="space-y-10">
                        {article.content.map((section, idx) => (
                            <section key={idx} className="scroll-mt-32">
                                {section.subtitle && (
                                    <h2 className="text-lg md:text-xl font-bold text-white mb-4 tracking-tight leading-tight antialiased text-left">
                                        {section.subtitle[lang]}
                                    </h2>
                                )}

                                <div className="text-zinc-300 text-sm md:text-[15px] leading-relaxed space-y-5 font-normal antialiased break-keep text-left">
                                    {section.text[lang].split('\n\n').map((para, pIdx) => (
                                        <p key={pIdx}>{para}</p>
                                    ))}
                                </div>

                                {/* Flow-integrated Image - Even Smaller and Aligned Left */}
                                {section.image && (
                                    <div className="my-8 space-y-2">
                                        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/5">
                                            <Image
                                                src={section.image}
                                                alt={section.imageCaption?.[lang] || ""}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {section.imageCaption && (
                                            <p className="text-zinc-500 text-[10px] font-medium text-left px-1">
                                                {section.imageCaption[lang]}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Ultra-minimal Insight List - Aligned Left */}
                                {section.list && (
                                    <div className="mt-8 p-6 rounded-xl bg-zinc-900/30 border border-white/5 space-y-3">
                                        {section.list[lang].map((item, lIdx) => (
                                            <div key={lIdx} className="flex gap-3 items-start">
                                                <div className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-amber-500/50" />
                                                <p className="text-zinc-400 text-xs md:text-sm font-medium leading-relaxed text-left">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        ))}
                    </article>

                    <div className="mt-20 pt-8 border-t border-zinc-900 text-left">
                        <Link
                            href={`/?lang=${lang}#magazine`}
                            className="text-[11px] font-semibold text-zinc-500 hover:text-white transition-colors"
                        >
                            ← {lang === 'ko' ? "매거진 목록으로" : "Back to Archive"}
                        </Link>
                    </div>
                </div>
            </main>

            <Footer lang={lang} />
        </div>
    );
}
