// Change this to your repository name
var GHPATH = '/stock-calculator';
 
// Choose a different app prefix name
var APP_PREFIX = 'gppwa_';
 
// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…). 
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = 'version_1';

const stockCalculator = "stock-calculator-v1"
const assets = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/css/styles.css`,
  `${GHPATH}/js/app.js`
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(stockCalculator).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
