"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { resolveSupportedLang, type SupportedLang } from "@/lib/site-content";

interface LanguageContextType {
    lang: SupportedLang;
    setLanguage: (lang: SupportedLang) => void;
    isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
    children, 
    initialLang 
}: { 
    children: React.ReactNode; 
    initialLang: SupportedLang;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Local state for instant updates
    const [lang, setLang] = useState<SupportedLang>(initialLang);

    // Sync with URL changes (e.g. browser back/forward)
    useEffect(() => {
        const urlLang = resolveSupportedLang(searchParams.get("lang") || "");
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sync URL-driven language changes (back/forward)
        setLang((prev) => (prev === urlLang ? prev : urlLang));
    }, [searchParams]);

    const setLanguage = (nextLang: SupportedLang) => {
        // 1. Instant state update for reactive UI
        setLang(nextLang);

        // 2. Persist explicit user choice immediately in the browser.
        document.cookie = `lang=${nextLang}; path=/; max-age=31536000; samesite=lax`;
        document.cookie = `lang_source=user; path=/; max-age=31536000; samesite=lax`;

        // 3. Update URL in background
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("lang", nextLang);
            const nextQuery = params.toString();
            router.push(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
        });
    };

    return (
        <LanguageContext.Provider value={{ lang, setLanguage, isPending }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
