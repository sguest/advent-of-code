let lib = require('../../lib');

let year = 2019;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    for(let line of lines) {
        var mass = +line;
        var fuel = Math.floor(mass / 3) - 2;
        while(fuel > 0) {
            total += fuel;
            fuel = Math.floor(fuel / 3) - 2;
        }
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});