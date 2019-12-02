let lib = require('../../lib');

let year = 2019;
let day = 2;

lib.getInput(year, day).then((data) => {
    let codes = data.split(',').map(x => +x);
    codes[1] = 12;
    codes[2] = 2;

    let pointer = 0;

    while(codes[pointer] !== 99) {
        let op = codes[pointer];
        let val1 = codes[codes[pointer + 1]];
        let val2 = codes[codes[pointer + 2]];

        if(op === 1) {
            codes[codes[pointer + 3]] = val1 + val2;
        }
        else {
            codes[codes[pointer + 3]] = val1 * val2;
        }
        pointer += 4;
    }

    console.log(codes[0]);
}).catch((err) => {
    console.log(err, err.stack);
});