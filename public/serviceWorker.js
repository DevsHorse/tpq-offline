const CACHE_NAME = 'pt_cache';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache
        .addAll(['/', 'index.html', 'static/js/bundle.js'])
        .then(() => self.skipWaiting());
    }),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  if (navigator.onLine) {
    const fetchRequest = e.request.clone();
    return fetch(fetchRequest).then((response) => {
      const isResponseExists = !!response;
      const isRequestFailed =
        response.status !== 200 && response.type !== 'opaque';
      const isAdditionalFilesRequest = ['basic', 'opaque'].includes(
        response.type,
      );

      if (!isResponseExists || isRequestFailed || !isAdditionalFilesRequest) {
        return response;
      }

      const responseToCache = response.clone();

      caches.open(CACHE_NAME).then((cache) => {
        cache.put(e.request, responseToCache);
      });
      return response;
    });
  } else {
    e.respondWith(
      caches.match(e.request).then((response) => {
        if (response) {
          return response;
        }
      }),
    );
  }
});
