const webpush = require('web-push');

const vapidKeys = {
    "publicKey":"BNXNoZeZOKExle8MH2Hzy0VxIWBabS2CB5zTbZ_efkvu6vG12W9MdYOBWXnTzw7JvsnPBzi9Mx83xj7ROfOX7NI",
    "privateKey":"FCKxsgP6NOHgAioZ3SkxkmkNDy3wXoAA-WmGu7YXBjM"
};

webpush.setGCMAPIKey('AAAAoQeUTz0:APA91bGYRspYlmu8vep2DYWmBa-HMknaxYb6WtGq1eYKp6rzNl3CVzszXlvOadkr-WWaXgP-dmXJdHC4wQL3XC-AqDNTpTC7WD43ol0bGHr2yYKi42MGOrj9K_Y3QyB98lgmknvhtlui')
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscribtion = {
    endpoint : 'https://fcm.googleapis.com/fcm/send/fqwQJMbTIlA:APA91bGQmpl7-p3t-Qyq7QO32xONHO6MZcVXNT14sM-ELXCIt6jsG_ZgnZ26QLzkSTAQ4f7rPcQfBF2JpcKfz2b8KTgKDo6qdz_-HdNQeyUtWauMFZST0byZPBIbgo9TXd2wQNewmoXJ',
    keys : {
        auth : 'AUHaOcbhpc68IZ5H5vyLaQ==',
        p256dh : 'BK7/M4xMupsF3dqqR2LWxhiWqFPUB4073QLCfUyQd8HOiJF4vupkIfag2axwihU9Wy+RBJyeLZPlTLvycIVTMjg='
    }
}

webpush.sendNotification(pushSubscribtion, 'Payload body From Server')