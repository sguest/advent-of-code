let lib = require('../../lib');
let intCodes = require('../lib/intcodes');
let Combinatorics = require('js-combinatorics');

let year = 2019;
let day = 7;

lib.getInput(year, day).then((data) => {
    let codes = intCodes.parse(data);

    let cmb = Combinatorics.permutation([5,6,7,8,9]);
    let max = 0;

    while(currentList = cmb.next())
    {
        let amplifiers = [];
        for(let amplifier = 0; amplifier < 5; amplifier++) {
            let program = intCodes.compile(codes.slice(0));
            let output = program.run(currentList[amplifier]);
            if(output.signal !== 'input') {
                throw `Unexpected signal ${output.signal} in init`;
            }

            amplifiers.push({
                ended: false,
                program
            });
        }

        let currentValue = 0;
        let currentAmplifier = 0;

        while(!amplifiers[currentAmplifier].ended) {
            let amplifier = amplifiers[currentAmplifier];
            let program = amplifier.program;
            let output = program.run(currentValue);
            if(output.signal !== 'output') {
                throw `Unexpected signal ${output.signal}, expected output`;
            }
            currentValue = output.value;
            output = program.run();
            if(output.signal === 'end') {
                amplifier.ended = true;
            }
            else if(output.signal !== 'input') {
                throw `Unexpected signal ${output.signal}, expected input or end`;
            }

            currentAmplifier = (currentAmplifier + 1) % 5;
        }

        max = Math.max(max, currentValue);
    }

    console.log(max);

}).catch((err) => {
    console.log(err, err.stack);
});