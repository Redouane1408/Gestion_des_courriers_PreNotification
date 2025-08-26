// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/auth-context'
import './index.css'
import './forced-colors.css' // Add this line

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// Service worker registration with enhanced update handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Add a timestamp to service worker URL to bypass browser cache
    const swUrl = `/service-worker.js?v=${new Date().getTime()}`;
    
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        console.log('✅ Service Worker registered with scope:', registration.scope);
        
        // Force immediate update check
        registration.update();
        
        // Check for updates more frequently (every 15 minutes)
        setInterval(() => {
          registration.update();
          console.log('🔄 Checking for Service Worker updates...');
        }, 15 * 60 * 1000);
        
        // Handle updates with more aggressive refresh
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔔 New service worker being installed...');
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('🆕 New content is available! Refreshing page...');
                  
                  // Show update notification to user
                  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    // Force refresh the page to get new assets
                    window.location.reload();
                  }
                }
              }
            });
          }
        });
      })
      .catch((err) => console.error('❌ Service Worker registration failed:', err));
  });
  
  // Handle controller change (when a new service worker takes over)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('🔄 New Service Worker controller, page will reload...');
    // Force reload the page when the service worker changes
    window.location.reload();
  });
  
  // Clear browser cache on page load (helps with Firefox)
  window.addEventListener('load', () => {
    if (caches) {
      // Clear all caches except the current service worker cache
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (!cacheName.includes('app-cache-v')) {
            caches.delete(cacheName);
          }
        });
      });
    }
  });
}
