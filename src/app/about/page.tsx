import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";
import { buildPageMetadata, getAboutCopy, resolveSupportedLang, type SupportedLang } from "@/lib/site-content";

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
        body: `FINDCORE는 ${PUBLISHER_PROFILE.operatorName}가 운영하며, 당신만의 고유한 미학을 깊이 있게 완성할 수 있도록 돕습니다. 제휴 및 서비스 문의는 공식 이메일(${PUBLISHER_PROFILE.email}) 또는 텔레그램(${PUBLISHER_PROFILE.telegramHandle})을 통해 지원합니다.`,
    },
    en: {
        badge: `Operated by ${PUBLISHER_PROFILE.operatorName}`,
        heading: "Premium Style Analysis Platform",
        body: `FINDCORE is operated by ${PUBLISHER_PROFILE.operatorName}, dedicated to helping you deeply understand and perfect your unique aesthetic. For partnerships and inquiries, reach out via our official email (${PUBLISHER_PROFILE.email}) or Telegram (${PUBLISHER_PROFILE.telegramHandle}).`,
    },
    zh: {
        badge: `${PUBLISHER_PROFILE.operatorName} 运营`,
        heading: "高级风格分析平台",
        body: `FINDCORE 由 ${PUBLISHER_PROFILE.operatorName} 运营，致力于帮助您深度理解并完善独特的美学风格。关于合作与咨询，请通过官方电子邮箱 (${PUBLISHER_PROFILE.email}) 或 Telegram (${PUBLISHER_PROFILE.telegramHandle}) 联系我们。`,
    },
    ja: {
        badge: `${PUBLISHER_PROFILE.operatorName} 運営`,
        heading: "プレミアムスタイル分析プラットフォーム",
        body: `FINDCOREは${PUBLISHER_PROFILE.operatorName}が運営しており、皆様がご自身の独自の美学を深く理解し、完成させるお手伝いをしています。提携やサービスに関するお問い合わせは、公式メール（${PUBLISHER_PROFILE.email}）または公式Telegram（${PUBLISHER_PROFILE.telegramHandle}）にて承ります。`,
    },
};

export default async function AboutPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getAboutCopy(currentLang);
    const textClass = currentLang === "ko" ? "font-korean break-keep" : "";
    const op = OPERATOR_COPY[currentLang];

    const allSections = [
        { title: op.heading, body: op.body },
        ...copy.sections
    ];

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro}>
            <div className="mx-auto max-w-3xl space-y-10 md:space-y-14 mt-4">
                {allSections.map((section) => (
                    <div
                        key={section.title}
                        className="group relative pl-6 md:pl-10"
                    >
                        {/* Vertical timeline line */}
                        <div className="absolute left-0 top-2 -bottom-10 w-px bg-white/5 group-hover:bg-cyan-500/30 transition-colors duration-500 group-last:bottom-0 group-last:bg-linear-to-b group-last:from-white/5 group-last:to-transparent" />
                        
                        {/* Glow dot */}
                        <div className="absolute left-[-3.5px] top-2.5 h-2 w-2 rounded-full border border-white/20 bg-black group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-500" />
                        
                        <h2 className={`text-lg md:text-xl font-semibold text-white tracking-tight mb-4 group-hover:text-cyan-50 transition-colors duration-300 ${textClass} ${/^[A-Za-z0-9\s!@#$%^&*()_+=-]+$/.test(section.title) ? "font-cinzel" : ""}`}>
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
