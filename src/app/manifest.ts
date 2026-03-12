import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: "FINDCORE",
        short_name: "FINDCORE",
        description: "AI face shape analysis, personal color analysis, and aesthetic tests by FINDCORE.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "portrait",
        lang: "en",
        categories: ["lifestyle", "utilities", "photo"],
        prefer_related_applications: false,
        shortcuts: [
            {
                name: "Aesthetic Test",
                short_name: "Aesthetic",
                description: "Start the aesthetic test.",
                url: "/test?lang=en",
            },
            {
                name: "Personal Color",
                short_name: "Color",
                description: "Open personal color analysis.",
                url: "/color?lang=en",
            },
            {
                name: "Face Shape",
                short_name: "Face Shape",
                description: "Open AI face shape analysis.",
                url: "/face-shape?lang=en",
            },
        ],
        icons: [
            {
                src: "/icon.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
