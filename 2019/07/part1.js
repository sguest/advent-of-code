let lib = require('../../lib');
let intCodes = require('../lib/intcodes');
let Combinatorics = require('js-combinatorics');

let year = 2019;
let day = 7;

lib.getInput(year, day).then((data) => {
    let codes = intCodes.parse(data);

    let cmb = Combinatorics.permutation([0,1,2,3,4]);
    let max = 0;

    while(currentList = cmb.next())
    {
        let currentValue = 0;
        for(let amplifier = 0; amplifier < 5; amplifier++) {
            let program = intCodes.compile(codes.slice(0));
            currentValue = program.run(currentList[amplifier], currentValue).value;
        }
        max = Math.max(max, currentValue);
    }

    console.log(max);

}).catch((err) => {
    console.log(err, err.stack);
});