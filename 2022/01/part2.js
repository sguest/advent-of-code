let lib = require('../../lib');

let year = 2022;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let max = [0, 0, 0];
    let current = 0;
    for(let line of lines) {
        if(line) {
            current += +line;
        }
        else {
            max[0] = Math.max(max[0], current);
            current = 0;
            max.sort((a, b) => a - b);
        }
    }

    console.log(max.reduce((a, b) => a + b));
}).catch((err) => {
    console.log(err, err.stack);
});