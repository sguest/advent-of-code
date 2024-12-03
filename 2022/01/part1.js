let lib = require('../../lib');

let year = 2022;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let max = 0;
    let current = 0;
    for(let line of lines) {
        if(line) {
            current += +line;
        }
        else {
            max = Math.max(max, current);
            current = 0;
        }
    }

    console.log(max);
}).catch((err) => {
    console.log(err, err.stack);
});