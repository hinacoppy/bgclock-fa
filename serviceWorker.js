/* serviceWorker.js */
'use strict';

const CACHE_NAME = "bgclock-fa-v1";
const ORIGIN = (location.hostname == 'localhost') ? '' : location.protocol + '//' + location.hostname;

const STATIC_FILES = [
  ORIGIN + '/bgclock-fa/',
  ORIGIN + '/bgclock-fa/index.html',
  ORIGIN + '/bgclock-fa/manifest.json',
  ORIGIN + '/bgclock-fa/icon/favicon.ico',
  ORIGIN + '/bgclock-fa/icon/apple-touch-icon.png',
  ORIGIN + '/bgclock-fa/icon/android-chrome-96x96.png',
  ORIGIN + '/bgclock-fa/icon/android-chrome-192x192.png',
  ORIGIN + '/bgclock-fa/icon/android-chrome-512x512.png',
  ORIGIN + '/bgclock-fa/css/bgclock-fa.css',
  ORIGIN + '/bgclock-fa/css/fontawesome.all.min.css',
  ORIGIN + '/bgclock-fa/js/bgclock.js',
  ORIGIN + '/bgclock-fa/js/jquery-3.4.1.min.js',
  ORIGIN + '/bgclock-fa/sounds/decision1.mp3',
  ORIGIN + '/bgclock-fa/sounds/decision7.mp3',
  ORIGIN + '/bgclock-fa/sounds/warning2.mp3',
  ORIGIN + '/bgclock-fa/webfonts/DSEG7Classic-BoldItalic.woff',
  ORIGIN + '/bgclock-fa/webfonts/fa-solid-900.woff2'
];

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_FILES.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});

