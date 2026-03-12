import type { SupportedLang } from "@/lib/site-content";
import { Footer } from "@/components/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SiteHeader } from "@/components/site-header";

interface StaticContentShellProps {
    lang: SupportedLang;
    title: string;
    intro: string;
    children: React.ReactNode;
}

export function StaticContentShell({
    lang,
    title,
    intro,
    children,
}: StaticContentShellProps) {
    const textClassName = lang === "ko" ? "font-korean break-keep" : "";

    return (
        <AuroraBackground className="justify-start pb-0">
            <div className="relative z-10 w-full min-h-dvh flex flex-col overflow-x-hidden">
                <SiteHeader
                    lang={lang}
                    position="sticky"
                    surfaceClassName="bg-black/20 backdrop-blur-xl"
                />

                <main className="relative z-10 flex-1 flex flex-col px-6 py-16 md:py-24 w-full justify-start items-center">
                    <div className="w-full max-w-5xl space-y-10">
                        <div className="space-y-6 text-center">
                            <h1 className={`text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl lg:text-6xl ${textClassName}`}>{title}</h1>
                            <p className={`mx-auto max-w-2xl text-base leading-7 text-white/60 ${textClassName}`}>{intro}</p>
                        </div>
                        {children}
                    </div>
                </main>

                <Footer lang={lang} />
            </div>
        </AuroraBackground>
    );
}
