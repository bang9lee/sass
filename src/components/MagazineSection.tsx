"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { LocalizedMagazineArticlePreview } from "@/lib/magazine-content";
import type { SupportedLang } from "@/lib/site-content";

interface MagazineSectionProps {
    lang: SupportedLang;
    articles: LocalizedMagazineArticlePreview[];
}

export function MagazineSection({ lang, articles }: MagazineSectionProps) {
    const isKorean = lang === "ko";
    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);
    
    return (
        <section id="magazine" className="w-full max-w-6xl mx-auto px-6 py-16 md:py-24 mb-20 scroll-mt-32">
            <div className="flex flex-col mb-10 border-b border-white/5 pb-6">
                <h2 className={`text-2xl md:text-3xl font-bold text-white tracking-tight ${isKorean ? "font-korean" : "font-sans"}`}>
                    {isKorean ? "FINDCORE 매거진" : "FINDCORE MAGAZINE"}
                </h2>
                <p className="mt-2 text-zinc-500 text-xs md:text-sm font-medium max-w-lg leading-relaxed antialiased">
                    {isKorean
                        ? "FINDCORE가 큐레이션한 감각적인 기록들과 트렌드 리포트."
                        : "Sensory records and trend reports curated by FINDCORE."}
                </p>
            </div>

            {featuredArticle && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 group"
                >
                    <Link href={`/magazine/${featuredArticle.id}?lang=${lang}`} className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                        <div className="relative w-full lg:w-3/5 aspect-16/10 overflow-hidden rounded-lg bg-zinc-900 shrink-0 border border-white/5">
                            <Image
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                fill
                                className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                                priority
                                sizes="(max-width: 1024px) 100vw, 720px"
                            />
                        </div>
                        <div className="flex-1 space-y-3 pt-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight text-amber-500">
                                <span>{featuredArticle.category}</span>
                                <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                                <span className="text-zinc-500">{featuredArticle.date}</span>
                            </div>
                            <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-amber-500 transition-colors antialiased whitespace-pre-line ${isKorean ? "font-korean" : "font-sans"}`}>
                                {featuredArticle.title}
                            </h3>
                            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-3 antialiased">
                                {featuredArticle.description}
                            </p>
                            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                                <span>{isKorean ? "전체 기사 읽기" : "Read Full Story"}</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 xl:gap-x-10 gap-y-12">
                {otherArticles.map((article, idx) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="group"
                    >
                        <Link href={`/magazine/${article.id}?lang=${lang}`} className="flex flex-col gap-4">
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900 border border-white/5">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[9px] font-bold tracking-tight text-zinc-500">
                                    <span className="text-amber-500/80">{article.category}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>

                                <h4 className={`text-lg xl:text-xl font-bold text-white group-hover:text-amber-500 transition-colors leading-tight line-clamp-2 antialiased whitespace-pre-line ${isKorean ? "font-korean" : "font-sans"}`}>
                                    {article.title}
                                </h4>

                                <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2 antialiased">
                                    {article.description}
                                </p>

                                <div className="pt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-500/80 group-hover:text-amber-500 transition-colors">
                                    <span>{isKorean ? "읽어보기" : "Read More"}</span>
                                    <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/5 flex justify-end">
                <Link
                    href={`/magazine?lang=${lang}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-500 transition-colors"
                >
                    <span>{isKorean ? "모든 기사 보기" : "View All Articles"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </section>
    );
}
