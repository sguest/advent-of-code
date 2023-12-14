let lib = require('../../lib');

let year = 2023;
let day = 12;

let cache = {};

function cached(pattern, nums) {
    let key = pattern + nums;
    if(cache[key] === undefined) {
        cache[key] = count(pattern, nums);
    }
    return cache[key];
}

function count(pattern, nums) {
    // pattern is exhausted, this is valid if there are no more groups
    let numValues = nums.split(',').map(x => +x);
    let total = numValues.reduce((a, b) => a + b) + numValues.length - 1;
    if(pattern.length < total) {
        return 0;
    }

    if(!pattern.length) {
        if(nums.length) {
            return 0;
        }
        else {
            return 1;
        }
    }

    // groups exhausted, return zero
    if(!nums.length) {
        if(pattern.indexOf('#') === -1) {
            return 1;
        }

        return 0;
    }

    // starting with dot, calculate rest of substring
    if(pattern[0] === '.') {
        return cached(pattern.substring(1), nums);
    }

    // check to make sure there are enough ? and # at the start of the string to match the current group
    let allSprings = pattern.replace(/\?/g, '#');
    let groupString = allSprings.substring(0, numValues[0]);
    let firstDot = groupString.indexOf('.');
    if(firstDot !== -1) {
        let leadingGroup = pattern.substring(0, firstDot);
        if(leadingGroup.indexOf('#') === -1) {
            pattern = pattern.substring(firstDot);
            return cached(pattern, nums);
        }
        else {
            return 0;
        }
    }

    // optional branch, calculate both cases
    if(pattern[0] === '?') {
        let chopped = pattern.substring(1);
        return cached(chopped, nums) + cached('#' + chopped, nums);
    }

    // if the character after the current group count is a #, this can't match
    if(pattern[numValues[0]] === '#') {
        return 0;
    }

    let remainder = pattern.substring(numValues[0] + 1);
    // only dots left in the string
    if(remainder.indexOf('#') === -1 && remainder.indexOf('?') === -1) {
        if(numValues.length === 1) {
            return 1;
        }

        return 0;
    }

    numValues.shift();
    return cached(remainder, numValues.join(','));
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sum = 0;
    for(let line of lines) {
        let [pattern, nums] = line.split(' ');

        let optionCount = cached(pattern, nums);

        sum += optionCount;
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});