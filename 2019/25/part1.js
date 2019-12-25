let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 25;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let program = intcodes.compile(codes);

    let instructions = [
        'north',
        'north',
        'take monolith',
        'north',
        'take hypercube',
        'south',
        'south',
        'east',
        'east',
        'take easter egg',
        'east',
        'south',
        'take ornament',
        'west',
        'south',
        'west'
    ]

    let output;
    for(let instruction of instructions) {
        output = program.readString(instruction, 10);
    }

    console.log(/\d+/.exec(output.str)[0]);
}).catch((err) => {
    console.log(err, err.stack);
});