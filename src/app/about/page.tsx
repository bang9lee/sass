import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";
import { buildPageMetadata, getAboutCopy, resolveSupportedLang, type SupportedLang } from "@/lib/site-content";
import { Sparkles, ShieldCheck, Compass, Info } from "lucide-react";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getAboutCopy(currentLang), "/about");
}

const OPERATOR_COPY: Record<SupportedLang, { badge: string; heading: string; body: string }> = {
    ko: {
        badge: `${PUBLISHER_PROFILE.operatorName} 운영`,
        heading: "프리미엄 스타일 분석 플랫폼",
        body: `FINDCORE는 ${PUBLISHER_PROFILE.operatorName}가 운영하며, 당신만의 고유한 미학을 깊이 있게 완성할 수 있도록 돕습니다. 제휴 및 서비스 문의는 공식 텔레그램(${PUBLISHER_PROFILE.telegramHandle})을 통해 지원합니다.`,
    },
    en: {
        badge: `Operated by ${PUBLISHER_PROFILE.operatorName}`,
        heading: "Premium Style Analysis Platform",
        body: `FINDCORE is operated by ${PUBLISHER_PROFILE.operatorName}, dedicated to helping you deeply understand and perfect your unique aesthetic. For partnerships and inquiries, reach out via our official Telegram (${PUBLISHER_PROFILE.telegramHandle}).`,
    },
    zh: {
        badge: `${PUBLISHER_PROFILE.operatorName} 运营`,
        heading: "高级风格分析平台",
        body: `FINDCORE 由 ${PUBLISHER_PROFILE.operatorName} 运营，致力于帮助您深度理解并完善独特的美学风格。关于合作与咨询，请通过官方 Telegram (${PUBLISHER_PROFILE.telegramHandle}) 联系我们。`,
    },
    ja: {
        badge: `${PUBLISHER_PROFILE.operatorName} 運営`,
        heading: "プレミアムスタイル分析プラットフォーム",
        body: `FINDCOREは${PUBLISHER_PROFILE.operatorName}が運営しており、皆様がご自身の独自の美学を深く理解し、完成させるお手伝いをしています。提携やサービスに関するお問い合わせは、公式Telegram（${PUBLISHER_PROFILE.telegramHandle}）にて承ります。`,
    },
};

const SECTION_ICONS = [Sparkles, ShieldCheck, Compass, Info];

export default async function AboutPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getAboutCopy(currentLang);
    const textClass = currentLang === "ko" ? "font-korean break-keep" : "";
    const op = OPERATOR_COPY[currentLang];

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro}>
            <div className="grid gap-4 md:grid-cols-3 auto-rows-min">
                {/* Hero Operator Bento Box */}
                <div className="md:col-span-3 rounded-4xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-8 sm:p-10 relative overflow-hidden group transition-all duration-500 hover:border-white/20 hover:bg-white/8">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-white/10 to-white/5 shadow-2xl border border-white/10 backdrop-blur-md text-white transition-transform group-hover:scale-105 duration-500">
                            <Sparkles className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                <p className={`text-xs font-semibold tracking-[0.15em] text-cyan-300 uppercase ${textClass}`}>{op.badge}</p>
                            </div>
                            <h2 className={`text-2xl sm:text-3xl font-bold text-white tracking-tight ${textClass}`}>{op.heading}</h2>
                            <p className={`mt-3 text-[15px] sm:text-base leading-relaxed text-white/60 ${textClass} max-w-2xl`}>{op.body}</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Sections Layout */}
                {copy.sections.slice(0, 3).map((section, i) => {
                    const Icon = SECTION_ICONS[i];
                    const spanClass = i === 0 
                        ? "md:col-span-2" 
                        : i === 1 
                            ? "md:col-span-1" 
                            : "md:col-span-3";

                    return (
                        <div
                            key={section.title}
                            className={`group rounded-4xl border border-white/8 bg-white/2 p-6 sm:p-8 transition-all duration-500 hover:bg-white/4 hover:border-white/15 hover:-translate-y-1 relative overflow-hidden ${spanClass}`}
                        >
                            <div className="absolute inset-0 bg-linear-to-b from-white/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-white/4 border border-white/10 flex items-center justify-center text-cyan-200/50 group-hover:text-cyan-300 transition-colors duration-500">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-4xl font-light text-white/5 opacity-50 select-none group-hover:text-white/10 transition-colors duration-500">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h2 className={`text-xl font-bold text-white tracking-tight mb-3 group-hover:text-cyan-50 transition-colors duration-300 ${textClass}`}>
                                    {section.title}
                                </h2>
                                <p className={`text-[15px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300 ${textClass}`}>
                                    {section.body}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </StaticContentShell>
    );
}
