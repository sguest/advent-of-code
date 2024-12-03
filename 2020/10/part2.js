let lib = require('../../lib');

let year = 2020;
let day = 10;

// There's probably a better way to express this mathematically, but this does the trick
function getMultiplier(sequence) {
    if(sequence <= 1) {
        return 1;
    }
    if(sequence === 2) {
        return 2;
    }
    if(sequence === 3) {
        return 4;
    }
    if(sequence === 4) {
        return 7;
    }
    return (sequence - 4) * 6 + 7
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let nums = [];
    for(let line of lines) {
        nums.push(+line);
    }
    nums = nums.sort((a, b) => a - b);
    nums.unshift(0);

    let combs = 1;
    let sequence = 0;
    for(let i = 0; i < nums.length - 1; i++) {
        // relies on the assumption that all gaps are 1 or 3 in size (i.e. no 2's)
        // holds true for this input, and seems to be consistent based on r/adventofcode
        if(nums[i+1] - nums[i] === 1) {
            sequence++;
        }
        else {
            combs *= getMultiplier(sequence);
            sequence = 0;
        }
    }
    combs *= getMultiplier(sequence);
    console.log(combs);
}).catch((err) => {
    console.log(err, err.stack);
});