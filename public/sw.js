const CACHE_NAME = "findcore-v1";
const APP_SHELL = [
    "/",
    "/color",
    "/face-shape",
    "/offline",
    "/manifest.webmanifest",
    "/icon.png",
    "/images/hero.webp",
    "/images/personal_color_hero_v8.webp",
    "/images/face_shape_hero_v7.webp",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
        return;
    }

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const cloned = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
                    return response;
                })
                .catch(async () => {
                    const cached = await caches.match(event.request);
                    return cached || caches.match("/offline");
                })
        );
        return;
    }

    if (
        event.request.destination === "image" ||
        url.pathname.startsWith("/_next/static/") ||
        url.pathname.endsWith(".css") ||
        url.pathname.endsWith(".js") ||
        url.pathname.endsWith(".woff2")
    ) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                const networkFetch = fetch(event.request)
                    .then((response) => {
                        const cloned = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
                        return response;
                    })
                    .catch(() => cached);

                return cached || networkFetch;
            })
        );
    }
});
