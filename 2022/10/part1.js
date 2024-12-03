let lib = require('../../lib');

let year = 2022;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let x = 1;
    let strength = 0;
    let cycle = 0;
    let lineNum = 0;
    let addPending = null;
    while(cycle <= 220) {
        cycle++;
        if((cycle + 20) % 40 === 0) {
            strength += cycle * x;
        }
        if(addPending !== null) {
            x += addPending;
            addPending = null;
            lineNum++;
        }
        else if(lines[lineNum].startsWith('addx')) {
            addPending = +(lines[lineNum].split(' ')[1])
        }
        else {
            lineNum++;
        }
    }

    console.log(strength);
}).catch((err) => {
    console.log(err, err.stack);
});