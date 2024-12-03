let lib = require('../../lib');

let year = 2020;
let day = 15;

lib.getInput(year, day).then((data) => {
    let nums = data.split(',').map(x => +x);

    let last = new Map();
    for(let i = 0; i < nums.length - 1; i++) {
        last.set(nums[i], i);
    }
    let current = nums[nums.length - 1];
    let index = nums.length - 1;

    while(index < 30000000 - 1) {
        let lastIndex = last.get(current);
        last.set(current, index);
        if(lastIndex !== undefined) {
            current = index - lastIndex;
        }
        else {
            current = 0;
        }
        index++;
    }
    console.log(current);
}).catch((err) => {
    console.log(err, err.stack);
});