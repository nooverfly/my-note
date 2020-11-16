/*class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() {
        return `${this.name} - ${this.age}`;
    }
}*/
import People from "./People.js";

self.onmessage = function (event) {
    let data = event.data;
    let p = new People(data.name, data.age);
    self.postMessage({
        str: p.toString()
    })
}
