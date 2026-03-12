import type { Metadata } from "next";
import ColorHomeClient from "@/components/color-home-client";

export const metadata: Metadata = {
    title: "Personal Color Test | findcore.me",
    description: "Discover your true personal color season.",
};

export default async function ColorLandingPage() {
    return <ColorHomeClient />;
}
