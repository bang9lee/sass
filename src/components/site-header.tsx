"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSelector } from "@/components/language-selector";
import { getNavigationLabels, type SupportedLang } from "@/lib/site-content";

type SiteSection = "home" | "aesthetic" | "color" | "face-shape" | null;

export type SiteHeaderProps = {
    lang: SupportedLang;
    position?: "absolute" | "sticky" | "fixed";
    surfaceClassName?: string;
    className?: string;
};

function resolveActiveSection(pathname: string, mode: string | null): SiteSection {
    if (pathname === "/") {
        return "home";
    }

    if (pathname === "/test" || pathname.startsWith("/result/")) {
        return "aesthetic";
    }

    if (pathname === "/color/test") {
        return mode === "shape" ? "face-shape" : "color";
    }

    if (pathname === "/color" || pathname.startsWith("/color/result/")) {
        return "color";
    }

    if (pathname === "/face-shape" || pathname.startsWith("/face-shape/result")) {
        return "face-shape";
    }

    if (pathname === "/test/face-shape-harness" || pathname === "/test/face-shape-report") {
        return null;
    }

    if (
        pathname.startsWith("/about") ||
        pathname.startsWith("/privacy") ||
        pathname.startsWith("/terms") ||
        pathname.startsWith("/guides")
    ) {
        return null;
    }

    if (pathname.startsWith("/test")) {
        return "aesthetic";
    }

    if (pathname.startsWith("/aesthetic")) {
        return "aesthetic";
    }

    return null;
}

function getDesktopLinkClass(section: Exclude<SiteSection, null>, activeSection: SiteSection) {
    if (activeSection === section) {
        if (section === "color") {
            return "text-[13px] font-medium text-pink-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap";
        }
        if (section === "face-shape") {
            return "text-[13px] font-medium text-cyan-300 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap";
        }
        return "text-[13px] font-medium text-white/90 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap";
    }

    return "text-[13px] font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase whitespace-nowrap";
}

function getMobileLinkClass(section: Exclude<SiteSection, null>, activeSection: SiteSection) {
    if (activeSection === section) {
        if (section === "color") {
            return "text-xl font-medium text-pink-300 hover:text-pink-200 transition-colors tracking-widest uppercase";
        }
        if (section === "face-shape") {
            return "text-xl font-medium text-cyan-300 hover:text-cyan-200 transition-colors tracking-widest uppercase";
        }
        return "text-xl font-medium text-white/90 hover:text-white transition-colors tracking-widest uppercase";
    }

    return "text-xl font-medium text-white/70 hover:text-white transition-colors tracking-widest uppercase";
}

export function SiteHeader({
    lang,
    position = "sticky",
    surfaceClassName = "bg-black/10 backdrop-blur-md",
    className = "",
}: SiteHeaderProps) {
    const router = useRouter();
    const pathname = usePathname() ?? "/";
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const labels = getNavigationLabels(lang);

    const activeSection = useMemo(
        () => resolveActiveSection(pathname, searchParams.get("mode")),
        [pathname, searchParams]
    );

    const positionClass = {
        absolute: "absolute top-0 left-0 right-0",
        sticky: "sticky top-0",
        fixed: "fixed top-0 left-0 right-0",
    }[position];

    const navItems = useMemo(
        () => [
            { href: `/?lang=${lang}`, label: labels.home, section: "home" as const },
            { href: `/aesthetic?lang=${lang}`, label: labels.aesthetic, section: "aesthetic" as const },
            { href: `/color?lang=${lang}`, label: labels.color, section: "color" as const },
            { href: `/face-shape?lang=${lang}`, label: labels.faceShape, section: "face-shape" as const },
        ],
        [lang, labels]
    );

    useEffect(() => {
        navItems.forEach((item) => {
            router.prefetch(item.href);
        });
    }, [router, navItems]);

    const handleLanguageChange = (nextLang: SupportedLang) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("lang", nextLang);
        const nextQuery = params.toString();
        router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname);
    };

    return (
        <>
            <header className={`${positionClass} z-50 w-full border-b border-white/5 ${surfaceClassName} ${className}`}>
                <div className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-3 sm:px-6 sm:py-4">
                    <div className="flex items-center shrink-0 justify-start">
                        <Link
                            href={`/?lang=${lang}`}
                            className="text-base font-bold tracking-widest text-white transition-colors hover:text-white/80 sm:text-lg font-cinzel"
                        >
                            FINDCORE
                        </Link>
                    </div>

                    <div className="hidden items-center justify-center sm:flex">
                        <nav className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.section}
                                    href={item.href}
                                    prefetch
                                    className={getDesktopLinkClass(item.section, activeSection)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center justify-end gap-3 sm:gap-0">
                        <LanguageSelector currentLang={lang} onSelect={handleLanguageChange} />
                        <button
                            type="button"
                            className="ml-2 p-2 text-white/80 hover:text-white sm:hidden"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-60 flex flex-col bg-black/95 backdrop-blur-2xl sm:hidden"
                    >
                        <div className="flex justify-end px-4 py-3">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-white/80 hover:text-white"
                                aria-label="Close navigation menu"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center gap-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.section}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        prefetch
                                        onClick={() => setIsMenuOpen(false)}
                                        className={getMobileLinkClass(item.section, activeSection)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pb-10 text-center">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/20 font-cinzel">FINDCORE</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
