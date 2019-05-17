function* genInts(i) {
    while (true) {
        i = i + 1;
        yield i;
    }
}

let gen1 = genInts(0);
let gen2 = genInts(100);

console.log(gen1.next().value);
console.log(gen2.next().value);
console.log(gen1.next().value);
console.log(gen2.next().value);
console.log(gen1.next().value);
console.log(gen2.next().value);