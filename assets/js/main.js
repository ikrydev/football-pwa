import loadNav from './modules/nav.js'
import loadPage from './modules/page.js'

if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(() => console.log("Register Success"))
            .catch(() => console.log("Register Not Success"))
    })
}else{
    console.log("Service Worker it is not supported!")
}

let path = window.location.hash.substr(1)
path ? path = path : path = 'home'

document.addEventListener('DOMContentLoaded', () => {
    loadNav()
    loadPage(path)
})