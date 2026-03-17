"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MAGAZINE_ARTICLES } from "@/lib/magazine-content";
import { ArrowRight } from "lucide-react";

interface MagazineSectionProps {
    lang: "ko" | "en" | "zh" | "ja";
}

export function MagazineSection({ lang }: MagazineSectionProps) {
    const isKorean = lang === "ko";
    
    return (
        <section className="w-full max-w-7xl mx-auto px-6 mt-32 mb-20 overflow-visible">
            <div className="flex justify-between items-end mb-12">
                <div className="space-y-4">
                    <h2 className={`text-3xl md:text-5xl font-black text-white tracking-tight ${isKorean ? "font-korean" : "font-cinzel"}`}>
                        {isKorean ? "FINDCORE 매거진" : "FINDCORE MAGAZINE"}
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base font-medium max-w-md">
                        {isKorean 
                            ? "전문가들이 들려주는 당신만의 분위기와 취향을 찾는 여정." 
                            : "A journey to find your unique vibe and taste through expert insights."}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MAGAZINE_ARTICLES.map((article, idx) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`group relative flex flex-col gap-5 ${idx === 0 ? "md:col-span-2 lg:col-span-2 lg:flex-row lg:items-center" : ""}`}
                    >
                        <div className={`relative overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 transition-all duration-700 group-hover:border-white/10 ${idx === 0 ? "lg:flex-1 aspect-video" : "aspect-4/3"}`}>
                            <Image
                                src={article.image}
                                alt={article.title[lang]}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white tracking-widest uppercase">
                                    {article.category[lang]}
                                </span>
                            </div>
                        </div>

                        <div className={`flex flex-col gap-3 ${idx === 0 ? "lg:w-1/3" : ""}`}>
                            <span className="text-zinc-600 text-[10px] font-bold tracking-widest">{article.date}</span>
                            <h3 className={`text-xl font-bold text-white transition-colors group-hover:text-cyan-400 break-keep ${isKorean ? "font-korean leading-snug" : "leading-tight"}`}>
                                {article.title[lang]}
                            </h3>
                            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-medium">
                                {article.description[lang]}
                            </p>
                            <div className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                                <span>READ MORE</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
