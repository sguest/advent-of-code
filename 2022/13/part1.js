let lib = require('../../lib');

let year = 2022;
let day = 13;

function compare(left, right) {
    if(typeof left === 'number' && typeof right === 'number') {
        return right - left;
    }

    if(typeof left === 'number') {
        return compare([left], right);
    }

    if(typeof right === 'number') {
        return compare(left, [right]);
    }

    let i = 0;

    while(i < left.length && i < right.length) {
        let result = compare(left[i], right[i]);
        if(result !== 0) {
            return result;
        }

        i++;
    }

    return right.length - left.length;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    for(let i = 0; i < lines.length / 3; i ++) {
        let left = JSON.parse(lines[i * 3]);
        let right = JSON.parse(lines[i * 3 + 1]);
        if(compare(left, right) > 0) {
            total += i + 1;
        }
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});