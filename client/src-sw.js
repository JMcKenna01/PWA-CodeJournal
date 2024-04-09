const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache application shell
precacheAndRoute(self.__WB_MANIFEST);

// Strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache successful responses
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 Days
    }),
  ],
});

// Warm up the page cache
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register route for navigating requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset caching
registerRoute(
  // Match files based on their request destination
  ({request}) => request.destination === 'style' ||
                 request.destination === 'script' ||
                 request.destination === 'worker',
  // Use a CacheFirst strategy for caching assets
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Only cache successful responses
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Limit the number of entries in the cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache assets for 30 days
        purgeOnQuotaError: true, // Clean up cache if quota is exceeded
      }),
    ],
  })
);
