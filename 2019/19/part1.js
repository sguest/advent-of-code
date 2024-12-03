let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 19;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let count = 0;

    for(let x = 0; x < 50; x++) {
        for(let y = 0; y < 50; y++) {
            let program = intcodes.compile(codes.slice(0));
            let output = program.run(x, y);
            if(output.value === 1) {
                count++;
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});