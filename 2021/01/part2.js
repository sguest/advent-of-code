let lib = require('../../lib');

let year = 2021;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    lines = lines.map(x => +x);
    let prev = Infinity;
    let count = 0;
    for(let i = 2; i < lines.length; i++) {
        let val = lines[i - 2] + lines[i - 1] + lines[i];
        if(val > prev) {
            count++;
        }
        prev = val;
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});