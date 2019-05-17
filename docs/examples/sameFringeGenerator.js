function node(left, right) {
    return { left: left, right: right, type: "node" };
}

function leaf(val) {
    return { type: "leaf", val: val };
}

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
        });
    }
};

function treeGenerator(tree) {
    return makeGenerator(function(next) {
        function visit(t) {
            if (t.type === 'leaf') {
                next(t.val);
            }
            else {
                visit(t.left);
                visit(t.right);
            }
        }
        visit(tree);
        next(false);
    });
}

let tree1 = node(leaf(10), node(leaf(20), leaf(30)))
let tree2 = node(node(leaf(10), leaf(20)), leaf(30));
let tree3 = node(leaf(10), leaf(50));

function sameFringeGen(t1, t2) {
    let gen1 = treeGenerator(t1);
    let gen2 = treeGenerator(t2);
    let r1 = gen1();
    let r2 = gen2();
    while (r1 !== false && r2 !== false) {
        if (r1 !== r2) {
            return false;
        }
        r1 = gen1();
        r2 = gen2();
    }
    return r1 === false && r2 === false;
}

console.log(sameFringeGen(tree1, tree2));
console.log(sameFringeGen(tree1, tree3));

