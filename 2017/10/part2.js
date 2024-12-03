let lib = require('../../lib');

let year = 2017;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lengths = data.split('').map((x) => x.charCodeAt(0));
    lengths.push(17, 31, 73, 47, 23);
    let nums = [];
    let currentPos = 0;
    let skipSize = 0;

    for(let index = 0; index < 256; index++) {
        nums.push(index);
    }

    for(let round = 0; round < 64; round++) {
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
    }

    let denseHash = [];

    for(let block = 0; block < 16; block++) {
        denseHash.push(nums.slice(block * 16, block * 16 + 16).reduce((a, b) => { return a ^ b; }));
    }

    console.log(denseHash.map((x) => {
        let val = x.toString(16);
        if(val.length === 1) {
            val = '0' + val;
        }
        return val;
    }).join(''));
});