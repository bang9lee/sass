"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MAGAZINE_ARTICLES } from "@/lib/magazine-content";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/components/language-provider";

interface MagazineIndexClientProps {
    lang: "ko" | "en" | "zh" | "ja";
}

export function MagazineIndexClient({}: MagazineIndexClientProps) {
    const { lang } = useLanguage();
    const isKorean = lang === "ko";

    const headerText = {
        ko: { title: "FINDCORE 매거진", subtitle: "뷰티, 패션, 라이프스타일의 감각적인 기록들과 트렌드 리포트.", allArticles: "모든 아티클" },
        en: { title: "FINDCORE Magazine", subtitle: "Sensory records and trend reports on beauty, fashion, and lifestyle.", allArticles: "All Articles" },
        zh: { title: "FINDCORE 杂志", subtitle: "美容、时尚和生活方式的感性记录与趋势报告。", allArticles: "所有文章" },
        ja: { title: "FINDCORE マガジン", subtitle: "ビューティー、ファッション、ライフスタイルの感覚的な記録とトレンドレポート。", allArticles: "すべての記事" },
    };

    const t = headerText[lang];
    const featuredArticle = MAGAZINE_ARTICLES[0];
    const otherArticles = MAGAZINE_ARTICLES.slice(1);

    return (
        <div className="min-h-dvh bg-black text-white">
            <SiteHeader lang={lang} position="fixed" />

            <main className="max-w-5xl mx-auto px-6 pt-28 pb-24">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h1 className={`text-3xl md:text-5xl font-bold tracking-tight ${isKorean ? "font-korean" : "font-cinzel uppercase"}`}>
                        {t.title}
                    </h1>
                    <p className="mt-4 text-zinc-500 text-sm md:text-base max-w-xl leading-relaxed">
                        {t.subtitle}
                    </p>
                    <div className="w-12 h-px bg-white/10 mt-6" />
                </motion.div>

                {/* Featured Article */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-20 group"
                    >
                        <Link href={`/magazine/${featuredArticle.id}?lang=${lang}`} className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative w-full md:w-3/5 aspect-16/10 overflow-hidden rounded-xl bg-zinc-900 shrink-0 border border-white/5">
                                <Image
                                    src={featuredArticle.image}
                                    alt={featuredArticle.title[lang]}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 600px"
                                />
                            </div>
                            <div className="flex-1 space-y-4 pt-2">
                                <div className="flex items-center gap-2 text-[10px] font-bold tracking-tight text-amber-500">
                                    <span>{featuredArticle.category[lang]}</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-700" />
                                    <span className="text-zinc-500">{featuredArticle.date}</span>
                                </div>
                                <h2 className={`text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-amber-500 transition-colors whitespace-pre-line ${isKorean ? "font-korean break-keep" : "font-sans"}`}>
                                    {featuredArticle.title[lang]}
                                </h2>
                                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                                    {featuredArticle.description[lang]}
                                </p>
                                <div className="inline-flex items-center gap-2 text-[11px] font-bold text-amber-500 mt-2">
                                    <span>Read Full Story</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* All Articles Label */}
                <div className="flex items-center gap-4 mb-10">
                    <h3 className={`text-lg font-semibold text-white/80 ${isKorean ? "font-korean" : ""}`}>
                        {t.allArticles}
                    </h3>
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-zinc-600 text-xs font-mono">{otherArticles.length}</span>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                    {otherArticles.map((article, idx) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 + idx * 0.04 }}
                            className="group"
                        >
                            <Link href={`/magazine/${article.id}?lang=${lang}`} className="flex flex-col gap-4">
                                <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-zinc-900 border border-white/5">
                                    <Image
                                        src={article.image}
                                        alt={article.title[lang]}
                                        fill
                                        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[9px] font-bold tracking-tight text-zinc-500">
                                        <span className="text-amber-500/80">{article.category[lang]}</span>
                                        <span>•</span>
                                        <span>{article.date}</span>
                                    </div>
                                    <h4 className={`text-base font-bold text-white group-hover:text-amber-500 transition-colors leading-tight line-clamp-2 whitespace-pre-line ${isKorean ? "font-korean" : "font-sans"}`}>
                                        {article.title[lang]}
                                    </h4>
                                    <p className="text-zinc-500 text-[11px] leading-relaxed line-clamp-2 font-medium">
                                        {article.description[lang]}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer lang={lang} />
        </div>
    );
}
