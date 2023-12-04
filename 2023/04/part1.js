let lib = require('../../lib');

let year = 2023;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sum = 0;
    for(let line of lines) {
        let split1 = line.split(': ');
        let split2 = split1[1].split(' | ');
        let winning = split2[0].split(' ');
        let nums = split2[1].split(' ');
        let score = 0;
        for(let num of nums) {
            if(num && winning.indexOf(num) !== -1) {
                if(score === 0) {
                    score =1;
                }
                else {
                    score *= 2;
                }
            }
        }
        sum += score;
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});