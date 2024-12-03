let lib = require('../../lib');

let year = 2021;
let day = 7;

lib.getInput(year, day).then((data) => {
    let crabs = data.split(',').map(x => +x);
    let min = Math.min(...crabs);
    let max = Math.max(...crabs);

    let smallest = Infinity;
    for(let i = min; i <= max; i++) {
        let total = 0;
        for(let crab of crabs) {
            distance = Math.abs(crab - i);
            total += distance * (distance + 1) / 2;
        }

        if(total < smallest) {
            smallest = total;
        }
    }

    console.log(smallest);
}).catch((err) => {
    console.log(err, err.stack);
});