let lib = require('../../lib');

let year = 2020;
let day = 9;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let nums = [];
    for(let line of lines) {
        nums.push(+line);
    }

    for(let i = 25; i < nums.length; i++) {
        let compare = nums.slice(i - 25, i);
        let found = false;
        for(let j = 0; j < 25; j++) {
            for(let k = j + 1; k < 25; k++) {
                if(compare[j] + compare[k] === nums[i]) {
                    found = true;
                }
            }
        }

        if(!found) {
            console.log(nums[i]);
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});