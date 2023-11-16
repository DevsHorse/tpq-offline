const CACHE_NAME = 'pt_cache';

self.addEventListener('install', e => {
    // console.log('installing sw')
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                'index.html',
                'static/js/bundle.js'
            ]).then(() => self.skipWaiting())
        })
    )
})

self.addEventListener('activate', e => {
    // console.log('activating sw')
    e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
    // console.log('Request', e.request.url)

    if (navigator.onLine) {
        const fetchRequest = e.request.clone();
        return fetch(fetchRequest).then(response => {
            if (!response || (response.status !== 200 && response.type !== 'opaque') || !['basic', 'opaque'].includes(response.type) ) {
                return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
                cache.put(e.request, responseToCache);
            })

            return response;
        })
    } else {
        e.respondWith(
            caches.match(e.request).then((response) => {
                if (response) {
                    return response;
                }
            })
        )
    }
})