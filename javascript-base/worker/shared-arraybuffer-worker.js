self.onmessage = ({data}) => {
    const view = new Uint8Array(data);
    console.log(`buffer value before worker modification: ${view[0]}`);
    // Worker assigns new value to shared buffer
    view[0] += 1;
    // Send back empty postMessage to signal assignment is complete
    self.postMessage(null);
}
