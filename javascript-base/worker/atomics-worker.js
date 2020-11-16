self.onmessage = ({data}) => {
    const view = new Uint32Array(data);
    for (let i = 0; i < 1e6; i++) {
        Atomics.add(view, 0, 1);
    }
    self.postMessage(null);
}
