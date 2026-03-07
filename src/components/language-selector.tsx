"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Language = 'ko' | 'en' | 'zh' | 'ja';

export function LanguageSelector({
    currentLang,
    onSelect
}: {
    currentLang: Language;
    onSelect: (lang: Language) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const labelMap: Record<Language, string> = {
        ko: '한국어',
        en: 'English',
        zh: '中文',
        ja: '日本語'
    };

    return (
        <div ref={ref} className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full
                   bg-white/10 border border-white/20
                   text-[11px] sm:text-sm font-medium text-white/80 hover:text-white hover:bg-white/15
                   transition-all"
            >
                <span className="truncate max-w-[45px] sm:max-w-none">{labelMap[currentLang]}</span>
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div
                    className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden min-w-30 z-50 shadow-2xl origin-top-right animate-in fade-in zoom-in-95 duration-200"
                >
                    {(['ko', 'en', 'zh', 'ja'] as Language[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => { onSelect(l); setIsOpen(false); }}
                            className={`block w-full px-5 py-3 text-sm text-left transition-colors
                                       ${currentLang === l ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            {labelMap[l]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
