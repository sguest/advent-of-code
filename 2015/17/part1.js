let lib = require('../../lib');

let year = 2015;
let day = 17;


function countCombinations(containers, remaining) {
    let count = 0;

    if(containers[0] === remaining) {
        count++;
    }

    if(containers.length > 1) {
        if(containers[0] < remaining) {
            count += countCombinations(containers.slice(1), remaining - containers[0]);
        }

        count += countCombinations(containers.slice(1), remaining);
    }

    return count;
}

lib.getInput(year, day).then((data) => {
    let containers = data.split('\n').map(x => parseInt(x, 10));

    containers = containers.sort((a, b) => b - a);

    console.log(countCombinations(containers, 150));
});