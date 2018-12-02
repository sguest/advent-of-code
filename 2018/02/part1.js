let lib = require('../../lib');

let year = 2018;
let day = 2;

lib.getInput(year, day).then((data) => {
    var twos = 0;
    var threes = 0;
    for(let line of data.split('\n')) {
        line = line.split('').sort().join('');
        var current = '';
        var count = 0;

        var twoFound = false;
        var threeFound = false;

        for(let char of line) {
            if(char === current) {
                count++;
            }
            else {
                if(count === 1) {
                    twoFound = true;
                }
                if(count === 2) {
                    threeFound = true;
                }
                current = char;
                count = 0;
            }
        }

        if(twoFound || count === 2) {
            twos++;
        }

        if(threeFound || count === 3) {
            threes++;
        }
    }
    console.log(twos * threes);
}).catch((err) => {
    console.log(err.stack);
});