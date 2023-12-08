let lib = require('../../lib');

let year = 2023;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let steps = lines[0];
    let nodes = {};
    lines.shift();
    lines.shift();
    let starts = [];
    for(let line of lines) {
        let parsed = /(...) = \((...), (...)\)/.exec(line);
        nodes[parsed[1]] = {L: parsed[2], R: parsed[3]}
        if(parsed[1].endsWith('A')) {
            starts.push(parsed[1])
        }
    }

    let counts = [];

    for(let start of starts) {
        let count = 0;
        let index = 0;
        let current = start;

        while(!current.endsWith('Z')) {
            let step = steps[index];
            current = nodes[current][step];

            count++;
            index = (index + 1) % steps.length;
        }

        counts.push(count);
    }

    console.log(lib.lcm(...counts));
}).catch((err) => {
    console.log(err, err.stack);
});