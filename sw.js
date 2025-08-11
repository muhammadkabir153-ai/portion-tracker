const CACHE_NAME = 'portion-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // icons, css etc. will be cached automatically if requested
];

self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE_NAME).then(c=> c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', ev => {
  ev.waitUntil(clients.claim());
});

self.addEventListener('fetch', ev => {
  ev.respondWith(
    caches.match(ev.request).then(resp => resp || fetch(ev.request).catch(()=> caches.match('./')))
  );
});
