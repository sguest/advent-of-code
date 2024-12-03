let lib = require('../../lib');

let year = 2023;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let steps = lines[0];
    let nodes = {};
    lines.shift();
    lines.shift();
    for(let line of lines) {
        let parsed = /(...) = \((...), (...)\)/.exec(line);
        nodes[parsed[1]] = {L: parsed[2], R: parsed[3]}
    }

    let current = 'AAA';
    let count = 0;
    let index = 0;
    while(current !== 'ZZZ') {
        let step = steps[index];
        current = nodes[current][step];
        count++;
        index = (index + 1) % steps.length;
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});