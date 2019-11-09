importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

workbox.clientsClaim()

//Pre Cache Resources
workbox.precaching.precacheAndRoute([
    {url: '/manifest.json', revision: '1'},
    {url: '/index.html', revision: '1'},
    {url: '/icon.png', revision: '1'},
    {url: '/favicon.ico', revision: '1'},
    {url: '/assets/css/materialize.min.css', revision: '1'},
    {url: '/assets/css/main.css', revision: '1'},
    {url: '/assets/js/materialize.min.js', revision: '1'},
    {url: '/assets/js/main.js', revision: '1'},
    {url: '/assets/js/idb.js', revision: '1'},
    {url: '/assets/js/modules/api.js', revision: '1'},
    {url: '/assets/js/modules/database.js', revision: '1'},
    {url: '/assets/js/modules/listener.js', revision: '1'},
    {url: '/assets/js/modules/nav.js', revision: '1'},
    {url: '/assets/js/modules/page.js', revision: '1'},
    {url: '/assets/js/modules/pwa.js', revision: '1'},
    {url: '/src/components/nav.html', revision: '1'},
    {url: '/src/pages/bookmark.html', revision: '1'},
    {url: '/src/pages/home.html', revision: '1'},
    {url: '/src/pages/teams.html', revision: '1'}
])

//Cache Images
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheOnly({
        cacheName: 'caches-images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 14 * 60 * 60,
            }),
        ],
    }),
);

//Assets
workbox.routing.registerRoute(
    new RegExp('/assets/'),
    workbox.strategies.cacheFirst()
)

//pages & components
workbox.routing.registerRoute(
    new RegExp('/src/'),
    workbox.strategies.cacheFirst()
)

//API
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/'),
    workbox.strategies.networkFirst({
        networkTimeoutSeconds: 3,
        cacheName: 'Football-JSON',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 60, // 1 week
            }),
        ],
    })
)

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
