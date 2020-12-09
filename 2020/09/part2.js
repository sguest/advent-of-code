let lib = require('../../lib');

let year = 2020;
let day = 9;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let target = 373803594;
    let nums = [];
    for(let line of lines) {
        nums.push(+line);
    }

    for(let i = 0; i < nums.length; i++) {
        let sum = 0;
        let j = i;
        let max = 0;
        let min = Infinity;
        while(j < nums.length && sum < target) {
            sum += nums[j];
            max = Math.max(max, nums[j]);
            min = Math.min(min, nums[j]);
            j++;
        }
        if(sum === target) {
            console.log(max + min);
            process.exit(0);
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});