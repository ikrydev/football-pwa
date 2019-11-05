const CACHE_NAME = 'footballPWA-v1'
const urlsToCache = [
    '/',
    '/manifest.json',
    '/index.html',
    '/src/components/nav.html',
    '/src/pages/home.html',
    '/src/pages/teams.html',
    '/src/pages/bookmark.html',
    '/favicon.ico',
    '/icon.png',
    '/assets/js/idb.js',
    '/assets/css/main.css',
    '/assets/css/materialize.min.css',
    '/assets/js/main.js',
    '/assets/js/materialize.min.js',
    '/assets/js/modules/api.js',
    '/assets/js/modules/nav.js',
    '/assets/js/modules/page.js',
    '/assets/js/modules/database.js',
    '/assets/js/modules/listener.js',
    '/assets/js/modules/pwa.js'
]

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
    let base_url = 'https://api.football-data.org/'
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
            caches
                .match(event.request, { cacheName: CACHE_NAME })
                .then(response => {
                    if(response){
                        //console.log(`Service Worker: Gunakan aset dari cache: ${response.url}`)
                        return response
                    }
                    //console.log(`ServiceWorker: Memuat aset dari server: ${event.request.url}`)
                    return fetch(event.request)
                })
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

//Response to Push Notification
self.addEventListener('push', event => {
    let body

    event.data ? body = event.data.text() : body = 'No Payload'
    const options = {
        body : body,
        icon : '/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})

