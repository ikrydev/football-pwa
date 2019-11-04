import loadNav from './modules/nav.js'
import loadPage from './modules/page.js'
import listener from './modules/listener.js'

// if("serviceWorker" in navigator){
//     window.addEventListener("load", () => {
//         navigator.serviceWorker
//             .register('./service-worker.js')
//             .then(() => console.log("Register Success"))
//             .catch(() => console.log("Register Not Success"))
//     })
// }else{
//     console.log("Service Worker it is not supported!")
// }

document.addEventListener('DOMContentLoaded', () => {
    loadNav()
    loadPage()
})

window.addBookmarkTeam = listener.addBookmarkTeam