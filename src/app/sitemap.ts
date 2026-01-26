import { MetadataRoute } from 'next';
import { AESTHETICS } from '@/lib/data';

const BASE_URL = 'https://aesthetic-core.vercel.app';
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
