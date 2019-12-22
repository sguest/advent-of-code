let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 9;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let program = intcodes.compile(codes);
    console.log(program.run(2).value);
}).catch((err) => {
    console.log(err, err.stack);
});