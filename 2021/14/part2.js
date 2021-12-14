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

    let pairs = {};
    for(let i = 0; i < template.length - 1; i++) {
        let match = template[i] + template[i + 1];
        pairs[match] = (pairs[match] || 0) + 1;
    }

    for(let step = 0; step < 40; step++)
    {
        let next = {};
        for(let key in pairs) {
            let insert = rules[key];
            let key1 = key[0] + insert;
            let key2 = insert + key[1];
            next[key1] = (next[key1] || 0) + pairs[key];
            next[key2] = (next[key2] || 0) + pairs[key];
        }

        pairs = next;
    }

    let counts = {};

    counts[template[0]] = 1;

    for(let key in pairs) {
        counts[key[1]] = (counts[key[1]] || 0) + pairs[key];
    }

    let max = Math.max(...Object.values(counts));
    let min = Math.min(...Object.values(counts));

    console.log(max - min);
}).catch((err) => {
    console.log(err, err.stack);
});