let lib = require('../../lib');

let year = 2016;
let day = 12;

let registers = { a: 0, b: 0, c: 1, d: 0};
let index = 0;

function getValue(val) {
    let numVal = parseInt(val, 10);
    if(isNaN(numVal)) {
        return registers[val];
    }
    return numVal;
}

let instructions = {
    'cpy': (x, y) => {
        registers[y] = getValue(x);
        index++;
    },
    'inc': (x) => {
        registers[x]++;
        index++;
    },
    'dec': (x) => {
        registers[x]--;
        index++;
    },
    'jnz': (x, y) => {
        if(getValue(x) !== 0) {
            index += getValue(y);
        }
        else {
            index++;
        }
    }
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let parse = /([a-z]{3}) (-?\d+|[a-z])\s?(-?\d+|[a-z])?/;

    while(index < lines.length) {
        let parsed = parse.exec(lines[index]);
        instructions[parsed[1]](parsed[2], parsed[3]);
    }

    console.log(registers.a);
});