// http://adventofcode.com/2017/day/5
// A 360603
// B 25347697

const readline = require('readline');
const fs = require('fs');

let teststack = [];

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('testdata')
});

lineReader.on('line', function (line) {
    teststack.push(parseInt(line, 10));
});

lineReader.on('close', function () {
    console.log('A: ', loopStack(teststack.slice(0)));
    console.log('B: ', loopStack(teststack.slice(0), true));
})

function loopStack(stack, subtract) {
    const max = stack.length;
    let inStack = true;
    let pos = 0;
    let steps = 0;
    while (inStack) {
        if (pos >= 0 && pos < max) {
            const move = stack[pos];
            if (move >= 3 && subtract) {
                stack[pos] = stack[pos] - 1;
            } else {
                stack[pos] = stack[pos] + 1;
            }
            pos += move;
        } else {
            return steps;
        }
        steps++;
    }
}
