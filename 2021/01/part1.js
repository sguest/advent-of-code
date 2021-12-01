let lib = require('../../lib');

let year = 2021;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let prev = Infinity;
    let count = 0;
    for(let line of lines) {
        let val = +line;
        if(val > prev) {
            count++;
        }
        prev = val;
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});