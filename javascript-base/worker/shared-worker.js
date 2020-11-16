const connectedPorts = new Set();
self.onconnect = function ({ports}) {
    let port = ports[0];
    connectedPorts.add(port);
    console.log(`${connectedPorts.size} unique connected ports`);
    port.addEventListener("message", function (e) {
        let workerResult = 'size: '+connectedPorts.size+', Result: ' + (e.data[0] * e.data[1]);
        // connectedPorts.forEach(p => p.postMessage(workerResult));
        port.postMessage(workerResult);
    });
    port.start();
}
