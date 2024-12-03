let lib = require('../../lib');

let year = 2020;
let day = 15;

lib.getInput(year, day).then((data) => {
    let nums = data.split(',').map(x => +x);
    while(nums.length < 2020) {
        let target = nums[nums.length - 1];
        let lastIndex = -1;
        let newIndex = -1;
        while(newIndex < nums.length - 1) {
            lastIndex = newIndex;
            newIndex = nums.indexOf(target, lastIndex  + 1);
        }
        if(lastIndex === -1) {
            nums.push(0);
        }
        else {
            nums.push(nums.length - lastIndex - 1);
        }
    }
    console.log(nums[2019]);
}).catch((err) => {
    console.log(err, err.stack);
});