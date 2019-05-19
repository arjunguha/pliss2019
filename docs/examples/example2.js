function F(k) {
    k(200);
    throw "bad";
}

console.log(100 + control(F));