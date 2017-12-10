let lib = require('../../lib');

let year = 2017;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lengths = data.split(',').map((x) => parseInt(x, 10));
    let nums = [];
    let currentPos = 0;
    let skipSize = 0;

    for(let index = 0; index < 256; index++) {
        nums.push(index);
    }

    for(let length of lengths) {
        let reverseArr = [];

        if(length + currentPos > nums.length) {
            reverseArr = nums.slice(currentPos);
            reverseArr.push(...nums.slice(0, length - (nums.length - currentPos)));
        }
        else {
            reverseArr = nums.slice(currentPos, currentPos + length);
        }

        reverseArr = reverseArr.reverse();

        if(length + currentPos > nums.length) {
            nums.splice(currentPos, nums.length - currentPos, ...(reverseArr.slice(0, nums.length - currentPos)));
            nums.splice(0, length - (nums.length - currentPos), ...(reverseArr.slice(nums.length - currentPos)));
        }
        else {
            nums.splice(currentPos, length, ...reverseArr);
        }

        currentPos = (currentPos + length + skipSize) % nums.length;
        skipSize++;
    }

    console.log(nums[0] * nums[1]);
});