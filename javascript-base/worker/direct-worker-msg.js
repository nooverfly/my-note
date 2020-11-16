let msgPort = null;
let contextIdentifier = null;

function addContextAndSend(data, destination) {
    // Add identifier to show when it reached this worker
    data.push(contextIdentifier);
    // Send data to next destination
    destination.postMessage(data);
}

self.onmessage = ({data, ports}) => {
    // If ports exist in the message,
    // set up the worker
    if (ports.length) {
        contextIdentifier = data;
        msgPort = ports[0];
        // Add a handler to send the received data
        msgPort.onmessage = ({data}) => {
            addContextAndSend(data, self);
        }
    } else {
        addContextAndSend(data, msgPort);
    }
}
