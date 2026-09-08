const CACHE_NAME = 'impostor-futbolero-v7-gratis-estable';
const APP_SHELL = [
  './', './index.html', './players.js', './online.js', './firebase-config.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './icons/favicon-32.png', './icons/favicon-16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => Promise.all(APP_SHELL.map((url) => cache.add(url).catch(() => undefined)))));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok && response.type === 'basic') caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  } catch (_) {
    return (await caches.match(request)) || (request.mode === 'navigate' ? caches.match('./index.html') : Response.error());
  }
}
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && response.type === 'basic') caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
  return response;
}
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  const dynamicCode = event.request.mode === 'navigate' || ['script', 'document'].includes(event.request.destination);
  event.respondWith(dynamicCode ? networkFirst(event.request) : cacheFirst(event.request));
});
