let lib = require('../../lib');

let year = 2021;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let num = lines.length;
    let counts = [];

    for(let line of lines) {
        for(let charIndex = 0; charIndex < line.length; charIndex++) {
            let char = line[charIndex];
            if(char === '1') {
                counts[charIndex] = (counts[charIndex] || 0) + 1;
            }
        }
    }

    let epsilon = '';
    let gamma = '';

    for(let count of counts) {
        if(count > num / 2) {
            epsilon += '0';
            gamma += '1';
        }
        else {
            epsilon += '1';
            gamma += '0';
        }
    }

    console.log(parseInt(epsilon, 2) * parseInt(gamma, 2));
}).catch((err) => {
    console.log(err, err.stack);
});