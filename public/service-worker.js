const CACHE_VERSION = '3'; // Increment this to force cache refresh
const CACHE_NAME = `app-cache-v${CACHE_VERSION}`;

// Add a timestamp parameter to force cache busting
const CACHE_TIMESTAMP = new Date().getTime();

// Assets that need to be cached
const ASSETS_TO_CACHE = [
  "/", 
  "/index.html",
  "/src/main.tsx",
];

// Map SVG requests to PNG files that actually exist
const FILE_MAPPING = {
  '/logo%20courriel%20management-05.svg': '/public/videos/thumbnails/logo-courriel-management-05.png',
  '/Logo-MF.svg': '/public/videos/thumbnails/Logo-MF.png',
  // Add any other mappings here
};

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
      return self.clients.claim(); // Take control of all clients immediately
    })
  );
});

// Helper function to determine if a request is for an image
function isImageRequest(request) {
  return request.url.match(/\.(png|jpg|jpeg|svg|gif)$/i);
}

// Helper function to check if we need to redirect the request
function getMappedUrl(url) {
  const urlPath = new URL(url).pathname;
  for (const [pattern, replacement] of Object.entries(FILE_MAPPING)) {
    if (urlPath.includes(pattern) || url.includes(pattern)) {
      return new URL(replacement, self.location.origin).toString();
    }
  }
  return url;
}

// Fetch event → network-first strategy for images, cache-first for other assets
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (requestUrl.origin !== location.origin) {
    return;
  }
  
  // Check if this request needs to be mapped to a different file
  const mappedUrl = getMappedUrl(event.request.url);
  const mappedRequest = mappedUrl !== event.request.url ? 
    new Request(mappedUrl, {
      method: event.request.method,
      headers: event.request.headers,
      mode: event.request.mode,
      credentials: event.request.credentials,
      redirect: event.request.redirect
    }) : event.request;
  
  // Add cache busting parameter to URLs
  const cacheBustUrl = new URL(mappedRequest.url);
  cacheBustUrl.searchParams.set('v', CACHE_VERSION + '-' + CACHE_TIMESTAMP);
  const cacheBustRequest = new Request(cacheBustUrl.toString(), {
    method: mappedRequest.method,
    headers: mappedRequest.headers,
    mode: mappedRequest.mode,
    credentials: mappedRequest.credentials,
    redirect: mappedRequest.redirect
  });
  
  // Network-first strategy for images (always try to get fresh images)
  if (isImageRequest(mappedRequest)) {
    event.respondWith(
      fetch(cacheBustRequest)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(mappedRequest, responseToCache);
          });
          
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(mappedRequest).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache under original URL, try the unmapped URL as fallback
            if (mappedUrl !== event.request.url) {
              return caches.match(event.request);
            }
            return null;
          });
        })
    );
    return;
  }
  
  // Cache-first strategy for other assets
  event.respondWith(
    caches.match(mappedRequest).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Not in cache, get from network
      return fetch(cacheBustRequest)
        .then(response => {
          // Clone the response to store in cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(mappedRequest, responseToCache);
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
