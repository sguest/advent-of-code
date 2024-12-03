let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 21;

lib.getInput(year, day).then((data) => {
    let program = intcodes.compile(intcodes.parse(data));

    let output = program.run();
    while(output.signal === 'output') {
        output = program.run();
    }

    let commands = ['NOT A J', 'NOT B T', 'OR T J', 'NOT C T', 'OR T J', 'AND D J', 'WALK'];

    for(let command of commands) {
        output = program.run(command, 10);
    }

    output = program.readString();
    //console.log(output.str)
    console.log(output.value);
}).catch((err) => {
    console.log(err, err.stack);
});