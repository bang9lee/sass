import type { Metadata } from "next";
import { StaticContentShell } from "@/components/static-content-shell";
import { PUBLISHER_PROFILE } from "@/lib/publisher-profile";
import { buildPageMetadata, getAboutCopy, resolveSupportedLang } from "@/lib/site-content";

type Props = {
    searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    return buildPageMetadata(currentLang, getAboutCopy(currentLang), "/about");
}

export default async function AboutPage({ searchParams }: Props) {
    const { lang } = await searchParams;
    const currentLang = resolveSupportedLang(lang);
    const copy = getAboutCopy(currentLang);
    const textClass = currentLang === "ko" ? "font-korean break-keep" : "";

    return (
        <StaticContentShell lang={currentLang} title={copy.heading} intro={copy.intro}>
            <section className="space-y-4">
                <div className="rounded-4xl border border-cyan-400/18 bg-cyan-400/8 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
                    <p className={`text-sm text-cyan-200/90 ${textClass}`}>{PUBLISHER_PROFILE.operatorName} 운영</p>
                    <h2 className={`mt-3 text-2xl font-semibold tracking-tight text-white ${textClass}`}>운영 주체와 연락처</h2>
                    <p className={`mt-4 text-[15px] leading-8 text-white/72 ${textClass}`}>
                        FINDCORE는 {PUBLISHER_PROFILE.operatorName}가 운영합니다. 문의는 Telegram {PUBLISHER_PROFILE.telegramHandle}로 받습니다.
                    </p>
                </div>
                {copy.sections.map((section) => (
                    <div key={section.title} className="rounded-4xl border border-white/12 bg-white/4.5 p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                        <h2 className={`text-xl font-semibold tracking-tight text-white ${textClass}`}>{section.title}</h2>
                        <div className="mt-4 h-px w-full bg-linear-to-r from-white/10 to-transparent" />
                        <p className={`mt-5 text-[15px] leading-8 text-white/70 ${textClass}`}>{section.body}</p>
                    </div>
                ))}
            </section>
        </StaticContentShell>
    );
}
