let threads = [ ];

function createThread(threadFunction) {
  function switcher(k) {
      threads.push(k);
      threadFunction();
      exitThread();
  });
  control(switcher);
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
    control(function(k) {
        threads.push(k);
        let kOther = threads.shift();
        kOther("resumed");
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
        console.log(i)
    };
})

console.log("Done");
exitThread();