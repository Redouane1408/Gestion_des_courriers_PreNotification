const CACHE_VERSION = '2'; // Increment this on each deployment
const CACHE_NAME = `app-cache-v${CACHE_VERSION}`;

// Add a timestamp parameter to force cache busting
const CACHE_TIMESTAMP = new Date().getTime();

// Assets that need to be cached
const ASSETS_TO_CACHE = [
  "/", 
  "/index.html",
  "/src/main.tsx",
];

// Dynamic assets that should be fetched from network first, then cached
const DYNAMIC_ASSETS = [
  "/public/videos/thumbnails/logo-courriel-management-05.png",
  "/public/videos/thumbnails/Logo-MF.png",
  "/public/videos/thumbnails/logo-courriel-management-01.png",
  "/public/videos/thumbnails/logo-courriel-management-02.png",
  "/public/videos/thumbnails/logo-courriel-management-03.png",
  "/public/videos/thumbnails/logo-courriel-management-04.png",
];

// Install event → cache required assets
self.addEventListener("install", (event) => {
  console.log('🔧 Service Worker installing with cache version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache static assets
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  
  // Activate immediately
  self.skipWaiting();
});

// Activate event → delete old caches
self.addEventListener("activate", (event) => {
  console.log('🚀 Service Worker activating with cache version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('🧹 Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker activated and controlling the page');
      return self.clients.claim(); // Take control of all clients
    })
  );
});

// Helper function to determine if a request is for an image
function isImageRequest(request) {
  return request.url.match(/\.(png|jpg|jpeg|svg|gif)$/i);
}

// Fetch event → network-first strategy for images, cache-first for other assets
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (requestUrl.origin !== location.origin) {
    return;
  }
  
  // Network-first strategy for images (always try to get fresh images)
  if (isImageRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first strategy for other assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Not in cache, get from network
      return fetch(event.request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone the response to store in cache
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      });
    })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
