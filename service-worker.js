var dataCacheName = 'bingo-v1';
var cacheName = 'bingo-final-1';
var filesToCache = [
  '/',
  '/index.html',
  '/js/bingo.js',
  '/js/jquery-3.2.1.min.js',
  '/js/materialize.min.js',
  '/css/animate.css',
  '/css/estilo.css',
  '/css/materialize.min.css',
  '/img/icon.png',
  '/img/icon.svg',
  '/audio/beep.mp3',
  '/audio/beep.ogg'
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
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
