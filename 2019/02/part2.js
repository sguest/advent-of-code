let lib = require('../../lib');
let intCodes = require('../lib/intcodes');

let year = 2019;
let day = 2;

lib.getInput(year, day).then((data) => {
    let originalCodes = intCodes.parse(data);

    for(let noun = 0; noun < 100; noun++) {
        for(let verb = 0; verb < 100; verb++) {
            let codes = originalCodes.slice(0);

            codes[1] = noun;
            codes[2] = verb;

            let program = intCodes.compile(codes);
            program.run();

            if(codes[0] === 19690720) {
                console.log(100 * noun + verb);
                process.exit(0);
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});