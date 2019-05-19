// Cooperative threads using first-class continuations
let threads = [];

function createThread(f) {
    function threadFunc() {
        f();
        start();
    }
    threads.push(threadFunc);
    yieldThread();
}

function start() {
    if (threads.length > 0) {
        let nextThread = threads.shift();
        nextThread();
    }
}

function yieldThread() {
    function switcher(k) {
        threads.push(k);
        let kOther = threads.shift();
        kOther("resumed");
    };

    control(switcher);
}

// Example program

function threadA() {
    for (let i = 0; i < 10; i++) {
        yieldThread();
        console.log(i);
    }
}

function threadB() {
    for (let i = 100; i < 110; i++) {
        yieldThread();
        console.log(i);
    };
}

createThread(threadA);
createThread(threadB);
start(); // needed to activate other threads