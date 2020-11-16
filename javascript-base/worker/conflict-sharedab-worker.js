self.onmessage = ({data}) => {
    const view = new Uint32Array(data);
    // Perform 1000000 add operations
    for (let i = 0; i < 1E6; ++i) {
        view[0] += 1;
    }
    console.log("view[0]: ", view[0]);
    self.postMessage(null);
}
