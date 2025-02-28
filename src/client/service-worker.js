const CACHE_NAME = 'travel-planner-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/index.js',
    '/styles/base.css',
    '/styles/footer.css',
    '/styles/form.css',
    '/styles/header.css',
    '/styles/resets.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// عند إجراء طلبات Fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                return fetch(event.request)
                    .then((networkResponse) => {
                        if (event.request.url.includes('/api/')) {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        return caches.match(event.request)
                            .then((cachedResponse) => {
                                return cachedResponse || new Response('No internet connection and no cached data.');
                            });
                    });
            })
    );
});
