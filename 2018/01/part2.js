let lib = require('../../lib');

let year = 2018;
let day = 1;

lib.getInput(year, day).then((data) => {
    var val = 0;
    var found = {};
    var done = false;
    while(!done) {
        for(let line of data.split('\n')) {
            var change = parseInt(line, 10);
            val += change;
            if(found[val]) {
                console.log(val);
                done = true;
                break;
            }
            else {
                found[val] = true;
            }
        }
    }
}).catch((err) => {
    console.log(err.stack);
});