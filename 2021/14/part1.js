let lib = require('../../lib');

let year = 2021;
let day = 14;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let template = lines.shift();
    lines.shift();
    let rules = {};
    for(let line of lines) {
        let parts = line.split(' -> ');
        rules[parts[0]] = parts[1];
    }

    for(let step = 0; step < 10; step++)
    {
        let next = template[0];
        for(let i = 0; i < template.length - 1; i++) {
            let match = template[i] + template[i + 1];
            next += rules[match] + template[i + 1];
        }

        template = next;
    }

    let counts = {};

    for(let char of template) {
        counts[char] = (counts[char] || 0) + 1;
    }

    let max = Math.max(...Object.values(counts));
    let min = Math.min(...Object.values(counts));

    console.log(max - min);
}).catch((err) => {
    console.log(err, err.stack);
});