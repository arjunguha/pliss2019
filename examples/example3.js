let x = control(function(k) {
    console.log("In argument to control");
    return k('Hello') + ' ignored';
    console.log("Will not display");
});
console.log("Result is: " + x);