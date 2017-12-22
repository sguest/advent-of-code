let lib = require('../../lib');

let year = 2016;
let day = 12;

let registers = { a: 7, b: 0, c: 0, d: 0};
let index = 0;
let lines;

function getValue(val) {
    let numVal = parseInt(val, 10);
    if(isNaN(numVal)) {
        return registers[val];
    }
    return numVal;
}

let replacements = {
    cpy: 'jnz',
    inc: 'dec',
    dec: 'inc',
    jnz: 'cpy',
    tgl: 'inc'
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
    },
    'tgl': (x) => {
        let targetIndex = index + getValue(x);
        if(targetIndex >= 0 && targetIndex < lines.length) {
            let targetInstruction = lines[targetIndex].substring(0, 3);
            lines[targetIndex] = replacements[targetInstruction] + lines[targetIndex].substring(3);    
        }
        index++;
    }
}

lib.getInput(year, day).then((data) => {
    lines = data.split('\n');

    let parse = /([a-z]{3}) (-?\d+|[a-z])\s?(-?\d+|[a-z])?/;

    while(index < lines.length) {
        let parsed = parse.exec(lines[index]);
        instructions[parsed[1]](parsed[2], parsed[3]);
    }

    console.log(registers.a);
});