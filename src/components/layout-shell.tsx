import { Footer } from "./footer";
import { SiteHeader } from "./site-header";
import type { SupportedLang } from "@/lib/site-content";

interface LayoutShellProps {
    children: React.ReactNode;
    lang: SupportedLang;
}

export function LayoutShell({ children, lang }: LayoutShellProps) {
    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col pt-16">
            <SiteHeader lang={lang} position="fixed" />

            <main className="flex-1 w-full flex flex-col">
                {children}
            </main>

            <Footer lang={lang} />
        </div>
    );
}
