"use client";

import Link from "next/link";
import { StaticContentShell } from "@/components/static-content-shell";
import type { GuideArticleCopy } from "@/lib/guides-content";
import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";
import type { SupportedLang } from "@/lib/site-content";
import { useLanguage } from "@/components/language-provider";
import { ArrowRight } from "lucide-react";

interface GuideArticleProps {
    lang: SupportedLang;
    copy: GuideArticleCopy;
}

function getTextClass(lang: SupportedLang) {
    return lang === "ko" ? "font-korean break-keep word-break-keep-all" : "";
}

export function GuideArticle({ lang: propLang, copy }: GuideArticleProps) {
    const { lang: ctxLang } = useLanguage();
    const lang = ctxLang ?? propLang;
    const textClass = getTextClass(lang);
    const operatorLabel =
        lang === "ko"
            ? `${PUBLISHER_PROFILE.operatorName} 운영`
            : lang === "ja"
              ? `${PUBLISHER_PROFILE.operatorName} 運営`
              : lang === "zh"
                ? `${PUBLISHER_PROFILE.operatorName} 运营`
                : `Operated by ${PUBLISHER_PROFILE.operatorName}`;

    return (
        <StaticContentShell lang={lang} title={copy.heading} intro={copy.intro} updatedLabel={copy.updatedLabel}>
            
            {/* Massive Hero-Style Metadata & Tags */}
            <div className="mt-12 mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/10 pb-16">
                <div className="space-y-6">
                    <p className={`text-sm tracking-widest uppercase text-white/40 font-medium`}>Keywords</p>
                    <div className="flex flex-wrap gap-4">
                        {copy.highlights.map((highlight) => (
                            <span
                                key={highlight}
                                className={`text-xl md:text-2xl font-light tracking-tight text-white/90 ${textClass}`}
                            >
                                #{highlight}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:text-right shrink-0 text-sm md:text-base text-white/40 font-light tracking-wide">
                    <span>{operatorLabel}</span>
                    <span>{copy.updatedLabel}</span>
                </div>
            </div>

            {/* Checklist Section - Editorial Minimalist Style */}
            <div className="mb-32">
                <h3 className={`text-xs tracking-[0.2em] uppercase text-cyan-400 font-semibold mb-12`}>Verification</h3>
                <h2 className={`text-4xl md:text-5xl font-medium tracking-tight text-white mb-16 ${textClass}`}>
                    {copy.checklistTitle}
                </h2>
                <div className="border-t border-white/10">
                    {copy.checklistItems.map((item, idx) => (
                        <div key={idx} className="flex gap-8 md:gap-16 py-8 border-b border-white/10 items-start group">
                            <span className="text-xl md:text-2xl font-light text-cyan-400/50 group-hover:text-cyan-400 transition-colors">
                                {(idx + 1).toString().padStart(2, '0')}
                            </span>
                            <p className={`text-xl md:text-2xl leading-relaxed text-white/80 font-light ${textClass}`}>
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Sections - Massive Typography & Editorial Layout */}
            <div className="space-y-32 mb-40">
                {copy.sections.map((section, idx) => (
                    <article key={idx} className="relative group">
                        
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-16 md:items-baseline">
                            <span className="text-[120px] md:text-[180px] leading-none font-bold text-white/3 tracking-tighter absolute -top-12 md:-top-24 -left-8 md:-left-16 pointer-events-none transition-colors group-hover:text-white/5">
                                {idx + 1}
                            </span>
                            <div className="relative z-10 w-full">
                                <h3 className={`text-3xl md:text-[44px] leading-tight font-medium text-white tracking-tight ${textClass}`}>
                                    {section.title.replace(/^\d+\.\s*/, '')}
                                </h3>
                            </div>
                        </div>

                        {/* Section Body */}
                        <div className="grid md:grid-cols-12 gap-12 md:gap-24 relative z-10">
                            <div className="md:col-span-5 hidden md:block">
                                <div className="w-16 h-px bg-white/20 mt-4 group-hover:w-32 transition-all duration-700 ease-out" />
                            </div>
                            <div className="md:col-span-12 lg:col-span-9 xl:col-span-8 md:col-start-4">
                                <div className={`text-xl md:text-[22px] leading-8 md:leading-10 text-white/70 font-light ${textClass}`}>
                                    {section.body.split('\n').map((paragraph, index) => (
                                        <p key={index} className="mb-8 last:mb-0">{paragraph}</p>
                                    ))}
                                </div>

                                {section.bullets && section.bullets.length > 0 && (
                                    <div className="mt-16 space-y-8 pl-8 border-l border-white/10 group-hover:border-cyan-500/30 transition-colors duration-500">
                                        {section.bullets.map((bullet, bIdx) => (
                                            <p key={bIdx} className={`text-lg md:text-[20px] leading-relaxed text-white/50 font-light relative before:content-[''] before:w-1.5 before:h-1.5 before:bg-white/20 before:rounded-full before:absolute before:-left-10 before:top-3 group-hover:before:bg-cyan-400 group-hover:text-white/70 transition-colors duration-500 ${textClass}`}>
                                                {bullet}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* FAQ - Minimalist Accordion Style (Without JS for simplicity, just clean lines) */}
            <section className="mb-40">
                <h3 className={`text-xs tracking-[0.2em] uppercase text-cyan-400 font-semibold mb-12`}>Knowledge Base</h3>
                <h2 className={`text-4xl md:text-5xl font-medium tracking-tight text-white mb-20 ${textClass}`}>
                    {copy.faqTitle}
                </h2>
                
                <div className="border-t border-white/10">
                    {copy.faqs.map((faq, i) => (
                        <div key={i} className="py-12 border-b border-white/10 grid md:grid-cols-12 gap-8 hover:bg-white/2 transition-colors -mx-4 md:-mx-8 px-4 md:px-8 group">
                            <div className="md:col-span-12 lg:col-span-11 md:col-start-2">
                                <div className="grid md:grid-cols-12 gap-8 lg:gap-16">
                                    <div className="md:col-span-5">
                                        <h3 className={`text-xl md:text-[26px] leading-snug font-medium text-white group-hover:text-cyan-100 transition-colors ${textClass}`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className="md:col-span-7">
                                        <p className={`text-lg md:text-[19px] leading-8 text-white/60 font-light ${textClass}`}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related - Massive Display Links */}
            <section className="pb-32">
                <h3 className={`text-xs tracking-[0.2em] uppercase text-cyan-400 font-semibold mb-12`}>Next Steps</h3>
                <h2 className={`text-2xl md:text-3xl font-medium tracking-tight text-white/50 mb-16 ${textClass}`}>
                    {copy.relatedTitle}
                </h2>
                <div className="grid gap-2">
                    {copy.related.map((link) => (
                        <Link
                            key={link.href}
                            href={`${link.href}?lang=${lang}`}
                            className="group block py-12 border-t border-white/10 relative overflow-hidden"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-px bg-cyan-400 scale-x-0 origin-left transition-transform duration-700 ease-out group-hover:scale-x-100" />
                            
                            <div className="flex flex-col md:flex-row gap-6 md:gap-16 md:items-center justify-between">
                                <div className="space-y-4 max-w-3xl">
                                    <h3 className={`text-3xl md:text-5xl font-medium text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-500 ${textClass}`}>
                                        {link.title}
                                    </h3>
                                    <p className={`text-xl text-white/40 font-light ${textClass}`}>
                                        {link.summary}
                                    </p>
                                </div>
                                <div className="shrink-0 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-all duration-500">
                                    <ArrowRight className="w-6 h-6 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" strokeWidth={1} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </StaticContentShell>
    );
}
