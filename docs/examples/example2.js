let x = control(function(k) {
    console.log("In argument to control");
    k(100);
    console.log("Will not display");
});
console.log("Result is: " + x);