let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 13;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let program = intcodes.compile(codes);

    let blocks = 0;

    while(true) {
        let output = program.run();
        if(output.signal === 'end') {
            break;
        }
        output = program.run();
        if(output.signal === 'end') {
            break;
        }
        output = program.run();
        if(output.signal === 'end') {
            break;
        }
        if(output.value === 2) {
            blocks++;
        }
    }
    console.log(blocks);
}).catch((err) => {
    console.log(err, err.stack);
});