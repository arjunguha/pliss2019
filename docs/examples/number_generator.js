////////////////////////////////////////////////////////////////////////////////
// A generator abstraction
////////////////////////////////////////////////////////////////////////////////

function makeGenerator(generator) {
    let caller = "Nothing yet";
    let gen = generator;
    let next = function(v) {
        control(function(rest) {
            gen = rest;
            caller(v)
        });
    };

    return function() {
        return control(function(k) {
            caller = k;
            gen(next);
            gen = function(_) {
                caller(false);
            }
        });
    }
};

////////////////////////////////////////////////////////////////////////////////
// Example of use
////////////////////////////////////////////////////////////////////////////////

let genNumbers = makeGenerator(function(next) {
    let i = 0;
    while (true) {
        next(i);
        i = i + 1;
    }
});

for (let i = 0; i < 10; i++) {
    console.log(genNumbers());
}
