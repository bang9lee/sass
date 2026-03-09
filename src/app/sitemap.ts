import { MetadataRoute } from 'next';
import { AESTHETICS } from '@/lib/data';

const BASE_URL = 'https://findcore.me';
const LANGUAGES = ['ko', 'en', 'zh', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    // 1. Root Page
    routes.push({
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
        alternates: {
            languages: Object.fromEntries(
                LANGUAGES.map((lang) => [lang, `${BASE_URL}/?lang=${lang}`])
            ),
        },
    });

    [
        { path: "/color", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/face-shape", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
        { path: "/guides", priority: 0.7, changeFrequency: "weekly" as const },
        { path: "/guides/face-shape-photo", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/guides/personal-color-photo", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/guides/result-reading", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/privacy", priority: 0.5, changeFrequency: "monthly" as const },
        { path: "/terms", priority: 0.5, changeFrequency: "monthly" as const },
    ].forEach((route) => {
        routes.push({
            url: `${BASE_URL}${route.path}`,
            lastModified: new Date(),
            changeFrequency: route.changeFrequency,
            priority: route.priority,
            alternates: {
                languages: Object.fromEntries(
                    LANGUAGES.map((lang) => [lang, `${BASE_URL}${route.path}?lang=${lang}`])
                ),
            },
        });
    });

    // 2. Result Pages (Dynamic)
    // Each result page also has language variants
    Object.keys(AESTHETICS).forEach((id) => {
        routes.push({
            url: `${BASE_URL}/result/${id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: Object.fromEntries(
                    LANGUAGES.map((lang) => [lang, `${BASE_URL}/result/${id}?lang=${lang}`])
                ),
            },
        });
    });

    return routes;
}
