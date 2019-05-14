let threads = [ ];

function createThread(threadFunction) {
  control(function(t) {
      threads.push(t);
      threadFunction();
      exitThread();
  });
}

function exitThread() {
    if (threads.length > 0) {
        threads.shift()();
    }
}

function yieldThread() {
    if (threads.length === 0) {
        return;
    }
    control(function(t) {
        let next = threads.shift();
        threads.push(t);
        next();
    });
}

createThread(function() {
    for (let i = 0; i < 10; i++) {
        yieldThread();
        console.log(i);
    }
})


createThread(function() {
    for (let i = 100; i < 110; i++) {
        yieldThread();
        console.log(i);
    }
})

console.log("Done");
exitThread();