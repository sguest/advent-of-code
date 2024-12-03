let lib = require('../../lib');

let year = 2020;
let day = 25;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let div = 20201227;
    let keys = lines.map(x => +x);

    let value = 1;
    let subject = 7;
    let loops = 0;
    while(value !== keys[0]) {
        value = (value * subject) % div;
        loops++;
    }

    subject = keys[1];
    value = 1;
    for(let i = 0; i < loops; i++) {
        value = (value * subject) % div;
    }

    console.log(value);
}).catch((err) => {
    console.log(err, err.stack);
});