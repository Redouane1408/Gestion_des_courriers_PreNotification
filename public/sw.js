const CACHE_NAME = 'courier-app-v3'; // Increment version to force cache refresh
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/videos/thumbnails/1.png'
];

// Clear old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // Skip caching for SVG files - handle both formats (with spaces and with hyphens)
  if (event.request.url.match(/\.svg$/) || 
      event.request.url.includes('%20') && event.request.url.endsWith('.svg')) {
    event.respondWith(
      fetch(event.request).catch(error => {
        // If the URL contains spaces, try to fetch with hyphens instead
        if (event.request.url.includes('%20')) {
          const newUrl = new URL(event.request.url);
          const path = newUrl.pathname.replace(/%20/g, '-');
          newUrl.pathname = path;
          return fetch(new Request(newUrl.toString(), {
            headers: event.request.headers,
            method: event.request.method
          }));
        }
        throw error;
      })
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});