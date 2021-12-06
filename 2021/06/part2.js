let lib = require('../../lib');

let year = 2021;
let day = 6;

lib.getInput(year, day).then((data) => {
    let fishes = data.split(',').map(x => +x);
    let nums = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(let fish of fishes) {
        nums[fish]++;
    }

    for(let day = 0; day < 256; day++) {
        let newFish = nums[0];

        for(let i = 0; i < 8; i++) {
            nums[i] = nums[i + 1];
        }

        nums[8] = newFish;
        nums[6] += newFish;
    }

    console.log(nums.reduce((a, b) => a + b));
}).catch((err) => {
    console.log(err, err.stack);
});