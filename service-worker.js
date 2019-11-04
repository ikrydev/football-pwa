const CACHE_NAME = 'football-pwa-v1'
const main = [
    '/',
    '/manifest.json',
    '/index.html',
    '/src/components/nav.html',
    '/src/pages/home.html',
    '/src/pages/teams.html',
    '/src/pages/bookmark.html'
]
const assets = [
    '/favicon.ico',
    '/icon.png',
    '/assets/js/idb.js',
    '/assets/css/main.css',
    '/assets/css/materialize.min.css',
    '/assets/js/main.js',
    '/assets/js/materialize.min.js',

]
const modules = [
    '/assets/js/modules/api.js',
    '/assets/js/modules/nav.js',
    '/assets/js/modules/page.js',
    '/assets/js/modules/database.js',
    '/assets/js/modules/listener.js'
]

const urlsToCache = [...main,...assets,...modules]

//Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    )
})

//Fetch Service Worker
self.addEventListener('fetch', event => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                if(response){
                    return response
                }
                return fetch(event.request)
            })
    )
})

//Delete Old Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
                .then(cacheNames => Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheName != CACHE_NAME) return caches.delete(cacheName)
                    })
                ))
    )
})

