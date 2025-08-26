// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/auth-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// Service worker registration with update handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('✅ Service Worker registered with scope:', registration.scope);
        
        // Check for updates on page load
        registration.update();
        
        // Check for updates periodically (every 60 minutes)
        setInterval(() => {
          registration.update();
          console.log('🔄 Checking for Service Worker updates...');
        }, 60 * 60 * 1000);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔔 New service worker being installed...');
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('🆕 New content is available! Refreshing page...');
                // Force refresh the page to get new assets
                window.location.reload();
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
  });
}
