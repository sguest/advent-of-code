let lib = require('../../lib');

let year = 2020;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let nums = [];
    for(let line of lines) {
        nums.push(+line);
    }
    nums = nums.sort((a, b) => a - b);
    nums.unshift(0);

    let ones = 0;
    let threes = 0;
    for(let i = 0; i < nums.length - 1; i++) {
        if(nums[i+1] - nums[i] === 1) {
            ones++;
        }
        if(nums[i+1] - nums[i] === 3) {
            threes++;
        }
    }
    threes++;
    console.log(ones * threes);
}).catch((err) => {
    console.log(err, err.stack);
});