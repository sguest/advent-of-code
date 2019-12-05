let lib = require('../../lib');
let intCodes = require('../lib/intcodes');

let year = 2019;
let day = 5;

lib.getInput(year, day).then((data) => {
    let codes = intCodes.parse(data);

    let results = intCodes.run(codes, 1);
    for(let item of results) {
        if(item) {
            console.log(item);
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});