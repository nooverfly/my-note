self.onmessage = ({data}) => {
    console.log(`worker's buffer size: ${data.foo.bar.byteLength}`); // 32
};
