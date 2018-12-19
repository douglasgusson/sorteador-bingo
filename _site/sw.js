var cacheName = 'cache-v1';
var filesToCache = [
  '/',
  'index.html',
  '/assets/audio/beep.mp3',
  '/assets/audio/beep.ogg',
  '/assets/css/styles.css',
  '/assets/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/assets/img/icons/icon-128x128.png',
  '/assets/img/icons/icon-144x144.png',
  '/assets/img/icons/icon-152x152.png',
  '/assets/img/icons/icon-192x192.png',
  '/assets/img/icons/icon-384x384.png',
  '/assets/img/icons/icon-512x512.png',
  '/assets/img/icons/icon-72x72.png',
  '/assets/img/icons/icon-96x96.png',
  '/assets/img/icon.png',
  '/assets/img/icon.svg',
  '/assets/js/bingo.js',
  '/assets/js/jquery-3.2.1.min.js',
  '/assets/js/materialize.min.js'  
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});



