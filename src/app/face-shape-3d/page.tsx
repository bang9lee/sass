import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { resolveSupportedLang, buildPageMetadata } from "@/lib/site-content";
import { cookies } from "next/headers";
import { FaceShape3DClient } from "@/components/face-shape-3d-client";

export async function generateMetadata() {
    const cookieStore = await cookies();
    const lang = resolveSupportedLang(cookieStore.get("lang")?.value);
    
    return buildPageMetadata(lang, {
        title: "3D Face Shape Analysis (Beta) | FINDCORE",
        description: "Experience high-precision 3D face shape analysis with real-time scanning technology. Discover your face shape with futuristic 3D depth estimation."
    }, "/face-shape-3d");
}

export default async function FaceShape3DPage() {
    const cookieStore = await cookies();
    const lang = resolveSupportedLang(cookieStore.get("lang")?.value);

    return (
        <div className="flex min-h-screen flex-col bg-black">
            <SiteHeader lang={lang} />
            <main className="flex-1">
                <FaceShape3DClient lang={lang} />
            </main>
            <Footer lang={lang} />
        </div>
    );
}
