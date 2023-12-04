let lib = require('../../lib');

let year = 2023;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let counts = [];
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let split1 = line.split(': ');
        let cardNum = i + 1;
        counts[cardNum] = counts[cardNum] || 0;
        counts[cardNum]++;
        let split2 = split1[1].split(' | ');
        let winning = split2[0].split(' ');
        let nums = split2[1].split(' ');
        let matches = 0;
        for(let num of nums) {
            if(num && winning.indexOf(num) !== -1) {
                matches++;
            }
        }
        for(let target = cardNum + 1; target <= cardNum + matches; target++) {
            if(target <= lines.length) {
                counts[target] = counts[target] || 0;
                counts[target] += counts[cardNum];
            }
            else {
                console.log(target);
            }
        }
    }
    console.log(counts.reduce((a, b) => a + b));
}).catch((err) => {
    console.log(err, err.stack);
});