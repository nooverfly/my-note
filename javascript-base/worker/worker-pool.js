/**
 * 两个任务：跟踪woker是否“忙”，管理进出worker的信息和事件
 */
class TaskWorker extends Worker {
    constructor(notifyAvailable, ...workerArgs) {
        super(...workerArgs);
        this.available = false;
        this.resolve = null;
        this.reject = null;
        this.notifyAvailable = notifyAvailable;
        this.onmessage = () => this.setAvailable();
    }

    // Called by the worker pool to begin a new task
    dispatch({resolve, reject, postMessageArgs}) {
        this.available = false;
        this.onmessage = ({data}) => {
            resolve(data);
            this.setAvailable();
        };
        this.onerror = (e) => {
            reject(e);
            this.setAvailable();
        };
        this.postMessage(...postMessageArgs);
    }

    setAvailable() {
        this.available = true;
        this.resolve = null;
        this.reject = null;
        this.notifyAvailable();
    }
}

class WorkerPool {
    constructor(poolSize, ...workerArgs) {
        this.taskQueue = [];
        this.workers = [];

        // Initialize the worker pool
        for (let i = 0; i < poolSize; i++) {
            this.workers.push(new TaskWorker(() => this.dispatchIfAvailable(), ...workerArgs));
        }
    }

    // Pushes a task onto the queue
    enqueue(...postMessageArgs) {
        return new Promise((resolve, reject) => {
            this.taskQueue.push({resolve, reject, postMessageArgs});
            this.dispatchIfAvailable();
        })
    }

    // Sends a task to the next available worker if there is one
    dispatchIfAvailable() {
        if (!this.taskQueue.length) {
            return;
        }
        for (const worker of this.workers) {
            if (worker.available) {
                let a = this.taskQueue.shift();
                worker.dispatch(a);
                break;
            }
        }
    }

    // Kills all the workers
    close() {
        for (const worker of this.workers) {
            worker.terminate();
        }
    }
}

let workerStr = `self.onmessage = ({data}) => {
    let sum = 0;
    let view = new Float32Array(data.arrayBuffer)
    // Perform sum
    for (let i = data.startIdx; i < data.endIdx; ++i) {
        // No need for Atomics since only performing reads
        sum += view[i];
    }
    // Send the result to the main thread
    self.postMessage(sum);
};
// Send message to TaskWorker to signal worker is
// ready to receive tasks.
self.postMessage('ready');`;

const totalFloats = 1E8;
const numTasks = 20;
const floatsPerTask = totalFloats / numTasks;
const numWorkers = 4;

let workerBlob = new Blob([workerStr]);
let workerUrl = URL.createObjectURL(workerBlob);
const pool = new WorkerPool(numWorkers, workerUrl);

let wpAB = new SharedArrayBuffer(4 * totalFloats);
let wpView = new Float32Array(wpAB);
for (let i = 0; i < totalFloats; i++) {
    wpView[i] = Math.random();
}
let partialSumPromises = [];
for (let i = 0; i < totalFloats; i += floatsPerTask) {
    partialSumPromises.push(pool.enqueue({
        startIdx: i,
        endIdx: i + floatsPerTask,
        arrayBuffer: wpAB
    }));
}

// Wait for all promises to complete, then sum
Promise.all(partialSumPromises).then(partialSums => partialSums.reduce((x, y) => x+y)).then(result => {
    console.log("result: " + result);
});
