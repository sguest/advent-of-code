let lib = require('../../lib');

let year = 2018;
let day = 1;

lib.getInput(year, day).then((data) => {
    var val = 0;
    for(let line of data.split('\n')) {
        var change = parseInt(line, 10);
        val += change;
    }
    console.log(val);
}).catch((err) => {
    console.log(err.stack);
});