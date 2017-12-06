// http://adventofcode.com/2017/day/6
// A
// B
let block = [2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14];

let seen = false;
let patternLog = [];
let pos = 0;
let counter = 0;
function getMaxIndex(arr) {
    const maxVal = Math.max(...arr);
    return arr.indexOf(maxVal);
}

while (!seen) {
    counter++;
    const maxIndex = getMaxIndex(block);
    pos = maxIndex;
    let dist = block[maxIndex];
    block[maxIndex] = 0;

    while (dist > 0) {
        if (pos === block.length - 1) {
            pos = 0;
        } else {
            pos++;
        }
        block[pos]++;
        dist--;
    }
    const currentPattern = block.join();
    if (patternLog.indexOf(currentPattern) === -1) {
        patternLog.push(currentPattern);
    } else {
        console.log('Number of reallocations (A):', counter);
        console.log('Loop length (B):', patternLog.length - patternLog.indexOf(currentPattern));
        seen = true;
    }
}
