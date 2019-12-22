let lib = require('../../lib');
let intCodes = require('../lib/intcodes');

let year = 2019;
let day = 5;

lib.getInput(year, day).then((data) => {
    let codes = intCodes.parse(data);

    let program = intCodes.compile(codes);
    let output = program.run(1);
    while(!output.value) {
        output = program.run();
    }

    console.log(output.value);
}).catch((err) => {
    console.log(err, err.stack);
});