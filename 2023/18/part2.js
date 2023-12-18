let lib = require('../../lib');

let year = 2023;
let day = 18;

function parse(line) {
    let [value] = /[0-9a-f]{6}/.exec(line);
    let num = parseInt(value.substring(0, 5), 16);
    let dir = value[5];

    return { num, dir };
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let x = 0;
    let y = 0;
    let deltas = {
        0: {x: 1, y: 0},
        1: {x: 0, y: 1},
        2: {x: -1, y: 0},
        3: {x: 0, y: -1},
    }

    let length = 0;
    let last;
    let sum = 0;

    for(let line of lines) {
        let parsed = parse(line);
        length += parsed.num;

        let delta = deltas[parsed.dir];
        for(let i = 0; i < parsed.num; i++) {
            x += delta.x;
            y += delta.y;
        }
        if(last) {
            sum += x * last.y - y * last.x;
        }
        last = { x, y };
    }

    let area = Math.abs(sum) / 2;

    console.log(length + (area + 1 - length / 2));
}).catch((err) => {
    console.log(err, err.stack);
});