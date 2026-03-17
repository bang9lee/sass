"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MAGAZINE_ARTICLES } from "@/lib/magazine-content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function MagazineSection() {
    const { lang } = useLanguage();
    const isKorean = lang === "ko";
    
    // Limit to 3 articles for a cleaner, more compact list if preferred, 
    // but here we just make the layout MUCH tighter.
    const featuredArticle = MAGAZINE_ARTICLES[0];
    const otherArticles = MAGAZINE_ARTICLES.slice(1);

    return (
        <section id="magazine" className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 mb-20 scroll-mt-32">
            {/* Clean Left-Aligned Header */}
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

            {/* Compact Featured Article */}
            {featuredArticle && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 group"
                >
                    <Link href={`/magazine/${featuredArticle.id}?lang=${lang}`} className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="relative w-full md:w-1/2 aspect-video overflow-hidden rounded-lg bg-zinc-900 shrink-0 border border-white/5">
                            <Image
                                src={featuredArticle.image}
                                alt={featuredArticle.title[lang]}
                                fill
                                className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                                priority
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                        </div>
                        <div className="flex-1 space-y-3 pt-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight text-amber-500">
                                <span>{featuredArticle.category[lang]}</span>
                                <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                                <span className="text-zinc-500">{featuredArticle.date}</span>
                            </div>
                            <h3 className={`text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-amber-500 transition-colors antialiased ${isKorean ? "font-korean" : "font-sans"}`}>
                                {featuredArticle.title[lang]}
                            </h3>
                            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-2 antialiased">
                                {featuredArticle.description[lang]}
                            </p>
                            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                                <span>Read Full Story</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}

            {/* Standard Blog Grid - 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
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
                                    alt={article.title[lang]}
                                    fill
                                    className="object-cover transition-opacity duration-500 group-hover:opacity-80"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[9px] font-bold tracking-tight text-zinc-500">
                                    <span className="text-amber-500/80">{article.category[lang]}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                </div>

                                <h4 className={`text-lg font-bold text-white group-hover:text-amber-500 transition-colors leading-tight line-clamp-2 antialiased ${isKorean ? "font-korean" : "font-sans"}`}>
                                    {article.title[lang]}
                                </h4>

                                <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2 antialiased font-medium">
                                    {article.description[lang]}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
