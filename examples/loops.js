// This is a somewhat contrived application of continuations to
// build a do ... while loop.
function beginLoop() {
    let saved = "nothing";
    function handler(k) {
          saved = k;
          saved("dummy");
    }
    control(handler);

    return {
        end: function(test) {
            if (test) {
                saved("dummy");
            }
        }
    }
}

// Example of use
let i = 0;
let loop1 = beginLoop();
    let j = 0;
    let loop2 = beginLoop();
        console.log(i + "," + j);
        j = j + 1;
    loop2.end(j < 5);
    i = i + 1;
loop1.end(i < 5);