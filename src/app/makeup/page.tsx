import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { resolveSupportedLang, buildPageMetadata } from "@/lib/site-content";
import { cookies } from "next/headers";
import { MakeupClient } from "@/components/makeup-client";
import { ToolInfoSection } from "@/components/tool-info-section";

export async function generateMetadata() {
    const cookieStore = await cookies();
    const lang = resolveSupportedLang(cookieStore.get("lang")?.value);
    
    return buildPageMetadata(lang, {
        title: "AI Makeup Simulator | FINDCORE",
        description: "Upload your photo and try virtual makeup powered by AI face detection. See lip color, blush, eyeshadow, and contour instantly."
    }, "/makeup");
}

export default async function MakeupPage() {
    const cookieStore = await cookies();
    const lang = resolveSupportedLang(cookieStore.get("lang")?.value);

    return (
        <div className="flex min-h-screen flex-col bg-black">
            <SiteHeader lang={lang} />
            <main className="flex-1">
                <MakeupClient lang={lang} />
                <ToolInfoSection lang={lang} type="makeup" />
            </main>
            <Footer lang={lang} />
        </div>
    );
}
