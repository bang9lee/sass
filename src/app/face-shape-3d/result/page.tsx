import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { resolveSupportedLang, buildPageMetadata } from "@/lib/site-content";
import { cookies } from "next/headers";
import { FaceShape3DResult } from "@/components/face-shape-3d-result";

export async function generateMetadata() {
    const cookieStore = await cookies();
    const lang = resolveSupportedLang(cookieStore.get("lang")?.value);
    
    return buildPageMetadata(lang, {
        title: "3D Face Shape Result | FINDCORE",
        description: "View your 3D face shape analysis results with multi-angle scanning data."
    }, "/face-shape-3d/result");
}

export default async function FaceShape3DResultPage() {
    const cookieStore = await cookies();
    const lang = resolveSupportedLang(cookieStore.get("lang")?.value);

    return (
        <div className="flex min-h-screen flex-col bg-black">
            <SiteHeader lang={lang} />
            <main className="flex-1">
                <FaceShape3DResult lang={lang} />
            </main>
            <Footer lang={lang} />
        </div>
    );
}
