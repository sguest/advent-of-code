let lib = require('../../lib');

let year = 2020;
let day = 16;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let validNums = new Set();
    let step = 0;
    let rate = 0;
    for(let line of lines) {
        if(step === 0) {
            if(line) {
                let parts = line.split(': ');
                let ranges = parts[1].split(' or ');
                for(let range of ranges) {
                    let rangeParts = range.split('-');
                    let min = +rangeParts[0];
                    let max = +rangeParts[1];
                    for(let i = min; i <= max; i++) {
                        validNums.add(i);
                    }
                }
            }
            else {
                step = 1;
            }
        }
        else if(step === 1) {
            if(!line) {
                step = 2;
            }
        }
        else {
            if(line !== 'nearby tickets:') {
                let nums = line.split(',').map(x => +x);
                for(let num of nums) {
                    if(!validNums.has(num)) {
                        rate += num;
                    }
                }
            }
        }
    }

    console.log(rate);
}).catch((err) => {
    console.log(err, err.stack);
});