import loadNav from './modules/nav.js'
import loadPage from './modules/page.js'
import pwa from './modules/pwa.js'

let path = window.location.hash.substr(1)
path ? path = path : path = 'home'

//Invoke PWA modules
pwa.registration()
pwa.notification()

document.addEventListener('DOMContentLoaded', () => {
    loadNav()
    loadPage(path)
})