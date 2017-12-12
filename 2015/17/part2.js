let lib = require('../../lib');

let year = 2015;
let day = 17;

let minLength = Infinity;
let count = 0;

function countCombinations(containers, remaining, currentLength) {
    if(containers[0] === remaining) {
        if(currentLength < minLength) {
            minLength = currentLength;
            count = 1;
        }
        else if(currentLength === minLength) {
            count++;
        }
    }

    if(containers.length > 1) {
        if(containers[0] < remaining) {
            countCombinations(containers.slice(1), remaining - containers[0], currentLength + 1);
        }

        countCombinations(containers.slice(1), remaining, currentLength);
    }
}

lib.getInput(year, day).then((data) => {
    let containers = data.split('\n').map(x => parseInt(x, 10));

    containers = containers.sort((a, b) => b - a);

    countCombinations(containers, 150, 0)

    console.log(count);
});