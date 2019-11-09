const registration = () => {
    if('serviceWorker' in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(() => console.log('Register Success'))
                .catch(() => console.log('Register Not Success'))
        })
    }else{
        console.log('Service Worker it is not supported!')
    }
}

const notification = () => {
    if('Notification' in window){
        Notification.requestPermission()
            .then(result => {
                if(result === 'denied'){
                    console.log('Denied')
                    return
                }else if (result === 'default'){
                    console.log('Default!')
                    return
                }
                if(('PushManager' in window)){
                    navigator.serviceWorker.getRegistration()
                        .then(reg => {
                            if(reg){
                                reg.pushManager
                                .subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: 'BNXNoZeZOKExle8MH2Hzy0VxIWBabS2CB5zTbZ_efkvu6vG12W9MdYOBWXnTzw7JvsnPBzi9Mx83xj7ROfOX7NI'
                                })
                                .then(sub => {
                                    console.log('Berhasil Subscribe dengan endpoint', sub.endpoint)
                                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))))
                                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))))
                                })
                                .catch(err => console.log('Gagal Subscribe : ',err))
                            }
                        })
                }
            })
    }
}

export default {
    registration,
    notification
}