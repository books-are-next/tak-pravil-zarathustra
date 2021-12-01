/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-0eb702e';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./section0004.html","./section0005.html","./section0006.html","./section0007.html","./section0008.html","./section0009.html","./section0010.html","./section0011.html","./section0012.html","./section0013.html","./section0014.html","./section0015.html","./section0016.html","./section0017.html","./section0018.html","./section0019.html","./section0020.html","./section0021.html","./section0022.html","./section0023.html","./section0024.html","./section0025.html","./section0026.html","./section0027.html","./section0028.html","./section0029.html","./section0030.html","./section0031.html","./section0032.html","./section0033.html","./section0034.html","./section0035.html","./section0036.html","./section0037.html","./section0038.html","./section0039.html","./section0040.html","./section0041.html","./section0042.html","./section0043.html","./section0044.html","./section0045.html","./section0046.html","./section0047.html","./section0048.html","./section0049.html","./section0050.html","./section0051.html","./section0052.html","./section0053.html","./section0054.html","./section0055.html","./section0056.html","./section0057.html","./section0058.html","./section0059.html","./section0060.html","./section0061.html","./section0062.html","./section0063.html","./section0064.html","./section0065.html","./section0066.html","./section0067.html","./section0068.html","./section0069.html","./section0070.html","./section0071.html","./section0072.html","./section0073.html","./section0074.html","./section0075.html","./section0076.html","./section0077.html","./section0078.html","./section0079.html","./section0080.html","./section0081.html","./section0082.html","./section0083.html","./section0084.html","./section0085.html","./section0086.html","./section0087.html","./section0088.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/88x31.png","./resources/obalka_tak_pravil_zarathustra.jpg","./resources/pd-88x31.png","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
