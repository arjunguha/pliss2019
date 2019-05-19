function callback3() {
    console.log("Liftoff!");
}

function callback2() {
    console.log("One");
    setTimeout(callback3, 1000);
}

function callback1() {
    console.log("Two");
    setTimeout(callback2, 1000);
}

console.log("Three");
setTimeout(callback1, 1000);