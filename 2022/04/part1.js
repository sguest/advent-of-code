let lib = require('../../lib');

let year = 2022;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let count = 0;
    for(let line of lines) {
        let elves = line.split(',');
        let first = elves[0].split('-');
        let second = elves[1].split('-');
        if((+first[0] <= +second[0] && +first[1] >= +second[1]) || +second[0] <= +first[0] && +second[1] >= +first[1]) {
            count++;
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});