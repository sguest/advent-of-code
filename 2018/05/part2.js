let lib = require('../../lib');

let year = 2018;
let day = 5;

lib.getInput(year, day).then((data) => {
    let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let values = [];

    for(let char of data) {
        values.push(char.charCodeAt(0));
    }

    let bestScore = Infinity;

    for(let letter of letters) {
        let change = true;
        let targetValue = letter.charCodeAt(0);

        let oldLine = [];

        for(let value of values) {
            if(value !== targetValue && value + 32 !== targetValue) {
                oldLine.push(value);
            }
        }

        while(change) {
            change = false;
            let newLine = [];

            let i = 0;
            while(i < oldLine.length) {
                let current = oldLine[i];
                let next = oldLine[i + 1];

                if((current ^ next) === 32) {
                    i+=2;
                    change = true;
                }
                else {
                    newLine.push(current);
                    i++;
                }
            }

            oldLine = newLine;
        }

        if(oldLine.length < bestScore) {
            bestScore = oldLine.length;
        }
    }

    console.log(bestScore);
}).catch((err) => {
    console.log(err.stack);
});