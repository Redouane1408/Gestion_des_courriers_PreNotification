const CACHE_NAME = "app-cache-v1"; // change version each deploy
const ASSETS_TO_CACHE = [
  "/", 
  "/index.html",
  "/src/main.tsx",
  "/public/videos/thumbnails/logo-courriel-management-05.png",
  "/public/videos/thumbnails/Logo-MF.png",
  "/public/videos/thumbnails/logo-courriel-management-01.png",
  "/public/videos/thumbnails/logo-courriel-management-02.png",
  "/public/videos/thumbnails/logo-courriel-management-03.png",
  "/public/videos/thumbnails/logo-courriel-management-04.png",
  // you can also add logo/icons etc
];

// Install event → cache required assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch event → serve from cache, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event → delete old caches when new one is available
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
