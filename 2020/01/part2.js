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
            for(let index3 = index2 + 1; index3 < nums.length; index3++) {
            if(nums[index] + nums[index2] + nums[index3] === 2020) {
                console.log(nums[index] * nums[index2] * nums[index3]);
            }
        }
    }
    }
}).catch((err) => {
    console.log(err, err.stack);
});