let lib = require('../../lib');

let year = 2022;
let day = 13;

function compare(left, right) {
    if(typeof left === 'number' && typeof right === 'number') {
        return left - right;
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

    return left.length - right.length;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let dividers = [[[2]], [[6]]]
    let packets = [...dividers];
    for(let line of lines) {
        if(line.length) {
            packets.push(JSON.parse(line));
        }
    }

    packets.sort(compare);
    console.log((packets.indexOf(dividers[0]) + 1) * (packets.indexOf(dividers[1]) + 1));
}).catch((err) => {
    console.log(err, err.stack);
});