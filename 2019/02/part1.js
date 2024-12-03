let lib = require('../../lib');
let intCodes = require('../lib/intcodes');

let year = 2019;
let day = 2;

lib.getInput(year, day).then((data) => {
    let codes = intCodes.parse(data);
    codes[1] = 12;
    codes[2] = 2;

    let program = intCodes.compile(codes);
    program.run();

    console.log(codes[0]);
}).catch((err) => {
    console.log(err, err.stack);
});