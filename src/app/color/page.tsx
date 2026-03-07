import type { Metadata } from "next";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Sparkles, Upload, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Personal Color Test | findcore.me",
    description: "Discover your true personal color season.",
};

import ColorHomeClient from "@/components/color-home-client";

export default async function ColorLandingPage() {
    return <ColorHomeClient />;
}
