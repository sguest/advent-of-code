let lib = require('../../lib');

let year = 2023;
let day = 3;

function getNumber(line, x) {
    if(isNaN(line[x])) {
        return 0;
    }
    let num = line[x];
    let xx = x - 1;
    while(!isNaN(line[xx])) {
        num = line[xx] + num;
        xx--;
    }
    xx = x + 1;
    while(!isNaN(line[xx])) {
        num = num + line[xx];
        xx++;
    }
    return +num;
}

function testNumber(line, x, numbers) {
    let num = getNumber(line, x);
    if(num) {
        numbers.push(num);
    }
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sum = 0;
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let above = lines[i - 1] || [];
        let below = lines[i + 1] || [];

        for(let x = 0; x < line.length; x++) {
            if(line[x] === '*') {
                let numbers = [];
                testNumber(line, x - 1, numbers);
                testNumber(line, x + 1, numbers);
                if(isNaN(above[x])) {
                    testNumber(above, x - 1, numbers);
                    testNumber(above, x + 1, numbers);
                }
                else {
                    testNumber(above, x, numbers);
                }

                if(isNaN(below[x])) {
                    testNumber(below, x - 1, numbers);
                    testNumber(below, x + 1, numbers);
                }
                else {
                    testNumber(below, x, numbers);
                }

                if(numbers.length === 2) {
                    sum += numbers[0] * numbers[1];
                }
            }
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});