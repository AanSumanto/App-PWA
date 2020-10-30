const CACHE_NAME = "TugasKoe-v2";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/icon-72x72.png",
    "/icon-128x128.png",
    "/icon-256x256.png",
    "/icon-512x512.png",
    "/pages/about.html",
    "/pages/guru.html",
    "/pages/home.html",
    "/pages/siswa.html",
    "/education1.svg",
    "/education2.svg",
    "/education3.png",
    "/education4.png",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache "+ cacheName + "dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});