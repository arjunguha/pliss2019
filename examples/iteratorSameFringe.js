function leaf(v) {
    return { kind: 'leaf', value: v };
}

function node(l, r) {
    return { kind: 'node', left: l, right: r };
}

// fringe<A>(t: Tree<A>): A[]
function fringe(t) {
    if (t.kind === 'leaf') { return [t.value]; }
    else { return fringe(t.left).concat(fringe(t.right)); }
}

function arrayEquals(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i = i + 1) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function sameFringeRec(t1, t2) {
    return arrayEquals(fringe(t1), fringe(t2));
}

function sameFringeIter(t1, t2) {
    let iter1 = treeIterator(t1);
    let iter2 = treeIterator(t2);
    while (iter1.hasNext() && iter2.hasNext()) {
        if (iter1.next() !== iter2.next()) {
            return false;
        }
    }
    return iter1.hasNext() === iter2.hasNext();
}

let tree1 = node(leaf(10), node(leaf(20), leaf(30)))
let tree2 = node(node(leaf(10), leaf(20)), leaf(30));
let tree3 = node(leaf(10), leaf(50));

function treeIterator(tree) {

    let stack = [tree];

    return {
        next: function() {
            let top = stack.pop();
            if (top.kind === 'leaf') {
                return top.value;
            }
            else {
                stack.push(top.right);
                stack.push(top.left);
                return this.next();
            }
        },
        hasNext: function() {
            return stack.length > 0;
        }
    };
}

console.log(sameFringeIter(tree1, tree2));

