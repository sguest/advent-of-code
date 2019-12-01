let lib = require('../../lib');

let year = 2019;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    for(let line of lines) {
        var mass = +line;
        var fuel = Math.floor(mass / 3) - 2;
        total += fuel;
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});