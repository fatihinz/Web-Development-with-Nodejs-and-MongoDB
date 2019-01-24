'use strict';

function foo(x, y) {
    let localVariable = 4;
    let sum = x + y;

    return sum;
}

function bar(baz) {
    console.log(baz);

    let results = foo(2, 5);

    console.log(results);

    return results;
}

bar('foobar');

console.log('done');
