function sleep(n) {
    function sleeper(k) {
      setTimeout(k, n);
    }
    control(sleeper);
}

console.log("Three");
sleep(1000);
console.log("Two");
sleep(1000);
console.log("One");
sleep(1000);
console.log("Liftoff!");
