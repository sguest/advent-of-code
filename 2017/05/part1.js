let lib = require('../../lib');

let year = 2017;
let day = 05;

lib.getInput(year, day).then((data) => {
    let jumps = [];
    for(var line of data.split('\n')) {
        jumps.push(parseInt(line, 10));
    }

    let index = 0;
    let steps = 0;

    while(index >= 0 && index < jumps.length) {
        let jumpNum = jumps[index];
        jumps[index]++;
        index += jumpNum;
        steps++;
    }
    console.log(steps);
});