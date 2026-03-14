import Link from "next/link";
import { StaticContentShell } from "@/components/static-content-shell";
import type { GuideArticleCopy } from "@/lib/guides-content";
import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";
import type { SupportedLang } from "@/lib/site-content";
import { useLanguage } from "@/components/language-provider";

interface GuideArticleProps {
    lang: SupportedLang;
    copy: GuideArticleCopy;
}

function getTextClass(lang: SupportedLang) {
    return lang === "ko" ? "font-korean break-keep" : "";
}

export function GuideArticle({ lang: propLang, copy }: GuideArticleProps) {
    const { lang } = useLanguage();
    const textClass = getTextClass(lang);
    const operatorLabel =
        lang === "ko"
            ? `${PUBLISHER_PROFILE.operatorName} 운영`
            : lang === "ja"
              ? `${PUBLISHER_PROFILE.operatorName} 運営`
              : lang === "zh"
                ? `${PUBLISHER_PROFILE.operatorName} 运营`
                : `Operated by ${PUBLISHER_PROFILE.operatorName}`;
    const contactLabel =
        lang === "ko"
            ? `문의 ${PUBLISHER_PROFILE.telegramHandle}`
            : lang === "ja"
              ? `連絡先 ${PUBLISHER_PROFILE.telegramHandle}`
              : lang === "zh"
                ? `联系 ${PUBLISHER_PROFILE.telegramHandle}`
                : `Contact ${PUBLISHER_PROFILE.telegramHandle}`;

    return (
        <StaticContentShell lang={lang} title={copy.heading} intro={copy.intro}>
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                <section className="rounded-4xl border border-white/12 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
                    <p className={`text-sm text-cyan-200/90 ${textClass}`}>{copy.updatedLabel}</p>
                    <p className={`mt-2 text-sm text-white/68 ${textClass}`}>{operatorLabel}</p>
                    <p className={`mt-1 text-sm text-white/56 ${textClass}`}>{contactLabel}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {copy.highlights.map((highlight) => (
                            <span
                                key={highlight}
                                className={`rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-xs text-white/80 ${textClass}`}
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </section>

                <aside className="rounded-4xl border border-cyan-400/18 bg-cyan-400/8 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
                    <h2 className={`text-lg font-semibold tracking-tight text-white ${textClass}`}>{copy.checklistTitle}</h2>
                    <ul className="mt-5 space-y-3">
                        {copy.checklistItems.map((item) => (
                            <li key={item} className={`flex gap-3 text-sm leading-7 text-white/78 ${textClass}`}>
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <section className="grid gap-4 lg:grid-cols-2">
                {copy.sections.map((section) => (
                    <article
                        key={section.title}
                        className="rounded-4xl border border-white/12 bg-white/4.5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8"
                    >
                        <h2 className={`text-xl font-semibold tracking-tight text-white ${textClass}`}>{section.title}</h2>
                        <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 to-transparent" />
                        <p className={`mt-5 text-[15px] leading-8 text-white/72 ${textClass}`}>{section.body}</p>
                        {section.bullets && section.bullets.length > 0 ? (
                            <ul className="mt-5 space-y-3">
                                {section.bullets.map((bullet) => (
                                    <li key={bullet} className={`flex gap-3 text-sm leading-7 text-white/68 ${textClass}`}>
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </article>
                ))}
            </section>

            <section className="space-y-4">
                <h2 className={`text-2xl font-semibold tracking-tight text-white ${textClass}`}>{copy.faqTitle}</h2>
                <div className="grid gap-4">
                    {copy.faqs.map((faq) => (
                        <article
                            key={faq.question}
                            className="rounded-4xl border border-white/12 bg-white/4.5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8"
                        >
                            <h3 className={`text-lg font-semibold tracking-tight text-white ${textClass}`}>{faq.question}</h3>
                            <p className={`mt-4 text-[15px] leading-8 text-white/72 ${textClass}`}>{faq.answer}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className={`text-2xl font-semibold tracking-tight text-white ${textClass}`}>{copy.relatedTitle}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {copy.related.map((link) => (
                        <Link
                            key={link.href}
                            href={`${link.href}?lang=${lang}`}
                            className="group rounded-4xl border border-white/12 bg-white/4.5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all hover:-translate-y-1 hover:bg-white/7"
                        >
                            <h3 className={`text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-200 ${textClass}`}>
                                {link.title}
                            </h3>
                            <p className={`mt-4 text-sm leading-7 text-white/65 ${textClass}`}>{link.summary}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </StaticContentShell>
    );
}
