let lib = require('../../lib');

let year = 2020;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let nums = [];
    for(let line of lines) {
        nums.push(+line);
    }

    for(let index = 0; index < nums.length; index++) {
        for(let index2 = index + 1; index2 < nums.length; index2++) {
            if(nums[index] + nums[index2] === 2020) {
                console.log(nums[index] * nums[index2]);
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});