// Offline-first: serve from cache, refresh in the background.
const CACHE = 'design-for-offline-v1';
const ASSETS = ['./', 'index.html', 'assets/style.css', 'assets/favicon.svg',
  'assets/spm.jpg', 'assets/realworld.jpg', 'assets/coredata.jpg', 'assets/ios18.jpg', 'assets/interview.jpg', 'assets/testing.jpg',
  'concepts/persistent-store.html', 'concepts/delta-sync.html', 'concepts/optimistic-ui.html',
  'concepts/conflict-resolution.html', 'concepts/crdt.html'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(cached => {
    const network = fetch(e.request).then(res => {
      if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
      return res;
    }).catch(() => cached);
    return cached || network;
  }));
});
