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

    while(output.signal === 'output') {
        if(output.value > 255) {
            console.log(output.value);
            process.exit(0);
        }
        //process.stdout.write(String.fromCharCode(output.value));
        output = program.run();
    }
}).catch((err) => {
    console.log(err, err.stack);
});