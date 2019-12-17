let lib = require('../../lib');

let year = 2019;
let day = 16;

lib.getInput(year, day).then((data) => {
    let input = '';

    for(let i = 0; i < 10000; i++) {
        input += data;
    }

    let skipCount = data.substring(0, 7);
    input = input.substring(skipCount);
    let values = input.split('').map(x => +x);

    for(let phase = 0; phase < 100; phase++) {
        let newValues = [];
        for(let index = values.length - 1; index >= 0; index--) {
            newValues[index] = ((newValues[index + 1] || 0) + values[index]) % 10;
        }
        values = newValues;
    }

    console.log(values.slice(0,8).join(''));
}).catch((err) => {
    console.log(err, err.stack);
});