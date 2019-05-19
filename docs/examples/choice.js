//////////////////////////////////////////////////////////////
// An implementation of non-deterministic evaluation, that
// produces all possible outcomes as an array.

// Internal state: holds thunks that produce remaining 
// outcomes.
let rest = [ ];

// NOTE: choose only works within the function passed to
// driver, which is defined below.
function choose() {
    let args = Array.from(arguments);
    return control(function(k) {
        // Store thunks in the rest array. Each thunk applies
        // the saved continuation with one of the remaining
        // arguments.
        for (let i = 1; i < args.length; i++) {
          rest.push(
              (function(v) {
                  return function() { return k(v); };
              })(args[i]));
        }

        // Return the first argument to the continuation
        // of the call to either.
        return k(args[0]);
    });
}

// driver(body: () => T): T[]
function driver(body) {
    let results = [ ];
    try {
      results.push(body());
    }
    catch (exn) {
        // Suppressing all exceptions impedes debugging. We
        // should really have a fail() function and only catch
        // that exception.
    }
    if (rest.length > 0) {
        let f = rest.pop();
        // Applying f will apply a continuation that produces
        // the next result. The last layer of that continuation
        // is the following:
        //
        //     results.push(hole);
        //     if (rest.length > 0) {
        //         let f = rest.pop();    
        //         f();
        //     }
        //     return results;
        //
        // Therefore, we will continue generating successsive
        // outcomes in a loop, until no outcomes remain.
        // Composable continuations (e.g., shift and reset) make
        // this easier.
        f();
    }
    return results;
}

//////////////////////////////////////////////////////////////
// Examples of use

console.log(driver(function() {
    return choose(10, choose(20, 30)) * choose(30, 40);
}));

function F() {
    return choose(1, 2, 3, 4, 5, 6);
}

console.log(driver(function() {
  let x = F();
  let y = F();
  if ((x + y) % 2 !== 0) {
      throw "Ignore odd numbers"
  }
  return x + y;
}));