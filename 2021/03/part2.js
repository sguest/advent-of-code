let lib = require('../../lib');

let year = 2021;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let zeroes = [];
    let ones = [];
    let currentLines = lines.slice(0);

    let charIndex = 0;
    let oxygen;
    while(!oxygen)
    {
        ones = [];
        zeroes = [];
        for(let line of currentLines) {
            if(line[charIndex] === '1') {
                ones.push(line);
            }
            else {
                zeroes.push(line);
            }
        }
        if(ones.length >= zeroes.length) {
            currentLines = ones;
        }
        else {
            currentLines = zeroes;
        }

        if(currentLines.length === 1) {
            oxygen = currentLines[0];
        }
        charIndex++;
    }

    currentLines = lines.slice(0);

    let co2;
    charIndex = 0;
    while(!co2)
    {
        ones = [];
        zeroes = [];
        for(let line of currentLines) {
            if(line[charIndex] === '1') {
                ones.push(line);
            }
            else {
                zeroes.push(line);
            }
        }
        if(ones.length < zeroes.length) {
            currentLines = ones;
        }
        else {
            currentLines = zeroes;
        }

        if(currentLines.length === 1) {
            co2 = currentLines[0];
        }
        charIndex++;
    }

    console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
}).catch((err) => {
    console.log(err, err.stack);
});