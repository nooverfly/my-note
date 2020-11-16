if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        /*navigator.serviceWorker.register("/note-demo/javascript-base/pwa/sw.js").then(function (swReg) {
            console.log('ServiceWorker registration successful');
            swReg.pushManager.getSubscription().then(function (subscription) {
                if (subscription) {
                    console.log(JSON.stringify(subscription));
                } else {
                    console.log('没有订阅');
                    subscribeUser(swReg);
                }
            })
        }).catch(function (error) {
            console.log('ServiceWorker registration failed: ', error);
        })*/
        navigator.serviceWorker.register("/note-demo/javascript-base/pwa/sw.js").then(function (swReg) {
            // registration worked
            console.log('Registration succeeded.');
            swReg.unregister().then(function (result) {
                console.log("result: ", result);
            }).catch(err => {
                console.log(err);
            })
        })
    })
}

/*function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeUser(swReg) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then(function (subscription) {
        console.log(JSON.stringify(subscription));
    }).catch(function (err) {
        console.log('订阅失败: ', err);
    })
}*/
