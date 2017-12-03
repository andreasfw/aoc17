//http://adventofcode.com/2017/day/3
// input 265149
// A 438
// B 266330

console.log('Steps: ', countSteps(buildMatrix(265149), 265149));
console.log('Next number: ', buildMatrix(100, 265149))

function countSteps(matrix, number) {
    let goalCoordinates = {};
    let numberCoordinates = {};
    for (let i = 0; i < matrix.length; i++) {
        const outerelement = matrix[i];
        for (let j = 0; j < matrix[i].length; j++) {
            const innerelement = matrix[i][j];
            if (innerelement === 1) {
                goalCoordinates.x = i;
                goalCoordinates.y = j;
            }
            if (innerelement === number) {
                numberCoordinates.x = i;
                numberCoordinates.y = j;
            }
        }
    }

    return ((goalCoordinates.x - numberCoordinates.x) < 0 ? ((goalCoordinates.x - numberCoordinates.x) * -1) : (goalCoordinates.x - numberCoordinates.x)) + ((goalCoordinates.y - numberCoordinates.y) < 0 ? ((goalCoordinates.y - numberCoordinates.y) * -1) : (goalCoordinates.y - numberCoordinates.y));
}

function buildMatrix(testNumber, nextNumber) {
    const size = Math.ceil(Math.sqrt(testNumber));
    let matrix = new Array(size);
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(size);

    }
    let currPos = {};
    currPos.x = Math.ceil(((matrix.length - 1) / 2));
    currPos.y = Math.ceil((matrix[0].length - 1) / 2);

    for (let i = 1; i <= testNumber; i++) {
        if (i === 1) {
            matrix[currPos.x][currPos.y] = i;
        } else {
            const east = matrix[currPos.x][currPos.y + 1],
                north = currPos.x - 1 < 0 ? undefined : matrix[currPos.x - 1][currPos.y],
                west = matrix[currPos.x][currPos.y - 1],
                south = currPos.x + 1 >= matrix.length ? undefined : matrix[currPos.x + 1][currPos.y];

            if ((east === undefined && north === undefined && west === undefined && south === undefined) || (typeof north === 'number') && east === undefined) {
                //move east
                currPos.y = currPos.y + 1;
            } else if (east == undefined && north === undefined && typeof west === 'number') {
                //move north
                currPos.x = currPos.x - 1;
            } else if (west === undefined && typeof south === 'number') {
                //move west
                currPos.y = currPos.y - 1;
            } else if (west === undefined && south === undefined && typeof east === 'number') {
                //move south
                currPos.x = currPos.x + 1;
            }
            if (nextNumber) {
                const sum = getSum(getSurriondingValues(matrix, currPos));
                if (sum > nextNumber) {
                    return sum;
                }
                matrix[currPos.x][currPos.y] = sum;
            } else {
                matrix[currPos.x][currPos.y] = i;
            }
        }
    }
    return matrix;
}


function getSurriondingValues(matrix, currPos) {
    const values = {
        east: matrix[currPos.x][currPos.y + 1],
        northeast: currPos.x - 1 < 0 ? undefined : matrix[currPos.x - 1][currPos.y + 1],
        north: currPos.x - 1 < 0 ? undefined : matrix[currPos.x - 1][currPos.y],
        northwest: currPos.x - 1 < 0 ? undefined : matrix[currPos.x - 1][currPos.y - 1],
        west: matrix[currPos.x][currPos.y - 1],
        southwest: currPos.x + 1 >= matrix.length ? undefined : matrix[currPos.x + 1][currPos.y - 1],
        south: currPos.x + 1 >= matrix.length ? undefined : matrix[currPos.x + 1][currPos.y],
        southeast: currPos.x + 1 >= matrix.length ? undefined : matrix[currPos.x + 1][currPos.y + 1]
    };
    return values;
}

function getSum(cordinates) {
    return (cordinates.east ? cordinates.east : 0)
        + (cordinates.northeast ? cordinates.northeast : 0)
        + (cordinates.north ? cordinates.north : 0)
        + (cordinates.northwest ? cordinates.northwest : 0)
        + (cordinates.west ? cordinates.west : 0)
        + (cordinates.southwest ? cordinates.southwest : 0)
        + (cordinates.south ? cordinates.south : 0)
        + (cordinates.southeast ? cordinates.southeast : 0);
}