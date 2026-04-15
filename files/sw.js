// ─────────────────────────────────────────────────────────────────
//  sw.js — Service Worker · Centro de Recursos Académicos
//
//  Estrategia: Cache First → Network Fallback
//  · Los recursos ya cacheados se sirven instantáneamente.
//  · Si no están en caché, se buscan en red y se almacenan.
//
//  Para forzar actualización: incrementa CACHE_VERSION.
// ─────────────────────────────────────────────────────────────────

const CACHE_NAME = 'centro-rec-v1';

// Recursos que se pre-cachean en el momento de la instalación
const PRECACHE_URLS = [
  './TPF.html',
  './app.js',
  './icon.png',
  './manifest.json'
];

// ── INSTALL: pre-cachear el shell de la app ───────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // activa el SW inmediatamente
  );
});

// ── ACTIVATE: eliminar cachés de versiones anteriores ─────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim()) // controla pestañas ya abiertas
  );
});

// ── FETCH: Cache First → Network Fallback ────────────────────────
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean GET
  if (event.request.method !== 'GET') return;

  // Ignorar peticiones de extensiones de Chrome u orígenes externos
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Recurso en caché: devolver inmediatamente
        // y actualizar en segundo plano (stale-while-revalidate)
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        }).catch(() => { /* sin red: no pasa nada, ya tenemos caché */ });

        return cachedResponse;
      }

      // Recurso NO en caché: ir a la red y guardar la respuesta
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Sin red y sin caché: devolver la página principal como fallback
        return caches.match('./TPF.html');
      });
    })
  );
});
