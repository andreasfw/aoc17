// http://adventofcode.com/2017/day/4
// A 451
// B 223
const readline = require('readline');
const fs = require('fs');

let countA = 0;
let countB = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('testdata')
});

lineReader.on('line', function (line) {
    if (checkPassphrase(line)) {
        countA++;
    }
    if (checkPassphrase(line) && anagramChecker(line)) {
        countB++;
    }
});

lineReader.on('close', function () {
    console.log('countA is', countA);
    console.log('countB is', countB);
})

function checkPassphrase(phrase) {
    const arr = phrase.split(' ');
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (arr.indexOf(element) !== i) {
            return false
        }
    }
    return true;
}

function anagramChecker(phrase) {
    const arr = phrase.split(' ');
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        const permutations = permutation('', element);
        for (let j = 0; j < permutations.length; j++) {
            if (arr.indexOf(permutations[j]) !== -1 && permutations[j] !== element) {
                return false
            }
        }
    }
    return true;
}

function permutation(start, string) {

    if (string.length == 1) {
        return [start + string];
    } else {
        var returnResult = [];
        for (var i = 0; i < string.length; i++) {
            var result = permutation(string[i], string.substr(0, i) + string.substr(i + 1));
            for (var j = 0; j < result.length; j++) {
                returnResult.push(start + result[j]);
            }
        }
        return returnResult;
    }
}