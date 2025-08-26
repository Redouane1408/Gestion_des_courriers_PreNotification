const CACHE_VERSION = '2'; // This gets updated automatically by CI/CD
const CACHE_NAME = `app-cache-v${CACHE_VERSION}`;

// Add a unique query parameter to ALL asset URLs to force cache busting
function addCacheBustingParam(url) {
  const urlObj = new URL(url, self.location.origin);
  urlObj.searchParams.set('v', CACHE_VERSION);
  return urlObj.toString();
}

// Assets that need to be cached
const ASSETS_TO_CACHE = [
  "/", 
  "/index.html",
  "/src/main.tsx",
];

// ALL image assets should use network-first strategy
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg", ".gif", ".webp"];

// Install event → cache required assets with cache busting
self.addEventListener("install", (event) => {
  console.log('🔧 Service Worker installing with cache version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache static assets with cache busting parameter
      const assetsWithCacheBusting = ASSETS_TO_CACHE.map(url => {
        return addCacheBustingParam(url);
      });
      return cache.addAll(assetsWithCacheBusting);
    })
  );
  
  // Activate immediately
  self.skipWaiting();
});

// Activate event → delete ALL old caches
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
      // Force claim all clients to ensure immediate control
      return self.clients.claim(); 
    })
  );
});

// Helper function to determine if a request is for an image
function isImageRequest(request) {
  const url = request.url.toLowerCase();
  return IMAGE_EXTENSIONS.some(ext => url.endsWith(ext));
}

// Fetch event → network-first for images, cache-first for other assets
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (requestUrl.origin !== location.origin) {
    return;
  }
  
  // Add cache busting for all requests
  const cacheBustedUrl = addCacheBustingParam(event.request.url);
  const cacheBustedRequest = new Request(cacheBustedUrl, {
    method: event.request.method,
    headers: event.request.headers,
    mode: event.request.mode,
    credentials: event.request.credentials,
    redirect: event.request.redirect
  });
  
  // Network-first strategy for images (always try to get fresh images)
  if (isImageRequest(event.request)) {
    event.respondWith(
      fetch(cacheBustedRequest)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(cacheBustedRequest, responseToCache);
          });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(cacheBustedRequest) || caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first strategy for other assets
  event.respondWith(
    caches.match(cacheBustedRequest)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Not in cache, get from network
        return fetch(cacheBustedRequest)
          .then(response => {
            // Clone the response to store in cache
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME).then(cache => {
              cache.put(cacheBustedRequest, responseToCache);
            });
            
            return response;
          });
      })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
