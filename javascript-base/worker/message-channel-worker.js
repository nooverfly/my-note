let msgPort = null;

function factorial(n) {
    let result = 1;
    while (n) {
        result *= n--;
    }
    return result;
}

self.onmessage = ({ports}) => {
    // Only set the port a single time
    if (!msgPort) {
        // Initial message sends the port,
        msgPort = ports[0];
        self.onmessage = null;
        // Set message handler on global object
        msgPort.onmessage = ({data}) => {
            // Subsequent messages send data
            msgPort.postMessage(`${data}! = ${factorial(data)}`);
        }
    }
}
