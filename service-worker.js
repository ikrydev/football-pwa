const CACHE_NAME = 'football-pwa-v2'
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
    let base_url = 'https://api.football-data.org'
    if(event.request.url.indexOf(base_url) > -1){
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return fetch(event.request)
                            .then(response => {
                                cache.put(event.request.url, response.clone())
                                return response
                            })
                })
        )
    }else{
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true})
                .then(response => response || fetch(event.request))
        )
    }
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

