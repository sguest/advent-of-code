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

    let commands = ['NOT A J', 'NOT B T', 'OR T J', 'NOT C T', 'OR T J', 'NOT E T', 'NOT T T', 'OR H T', 'AND T J', 'AND D J', 'RUN'];

    for(let command of commands) {
        let input = command.split('').map(x => x.charCodeAt(0));
        input.push(10)
        output = program.run(input);
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