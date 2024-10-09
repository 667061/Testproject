const cacheName = 'portfolio-cache-v1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(resourcesToPrecache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});
