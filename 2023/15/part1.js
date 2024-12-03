let lib = require('../../lib');

let year = 2023;
let day = 15;

lib.getInput(year, day).then((data) => {
    let steps = data.split(',');

    let sum = 0;
    for(let step of steps) {
        let value = 0;
        for(let char of step) {
            value += char.charCodeAt(0);
            value *= 17;
            value %= 256;
        }
        sum += value;
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});