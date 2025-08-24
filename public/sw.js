const CACHE_NAME = 'courier-app-v5'; // Increment version to force cache refresh
const urlsToCache = [
  '/',
  '/index.html'
  // Don't cache JS/CSS files to avoid encoding issues
];

// Clear old caches on activation
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated, clearing old caches');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Skip caching for all assets that might have encoding issues
  if (event.request.url.match(/\.(svg|js|css)$/) || event.request.url.includes('%20')) {
    console.log('Bypassing cache for:', event.request.url);
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});