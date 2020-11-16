self.addEventListener('install', function (e) {
    e.waitUntil(
        /*caches.open('pwa-demo').then(function (cache) {
            return cache.addAll([
                "/note-demo/javascript-base/pwa/pwa.html",
                "/note-demo/javascript-base/pwa/pwa.js",
                "/note-demo/javascript-base/pwa/pwa.css",
                "/note-demo/javascript-base/pwa/visualization.jpg",
            ])
        })*/
        caches.delete('pwa-demo')
    );
})

/*self.addEventListener('fetch', function (e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    )
})

// 添加notificationclick事件监听器，在点击notification时触发
self.addEventListener('notificationclick', function(event) {
    // 关闭当前的弹窗
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://www.baidu.com')
    )
});

// 触发一条通知
self.registration.showNotification('您有新消息', {
    body: "Hello Service Worker",
    icon: "./favicon.ico"
})*/
