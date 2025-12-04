let lib = require('../../lib');

let year = 2025;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    for(let line of lines) {
        let currentValue = 0;
        let startIndex = 0;
        for(let digit = 0; digit < 12; digit++)
        {
            let maxDigit = 0;
            let nextIndex = startIndex;
            for(let i = startIndex; i < line.length - 11 + digit; i++) {
                let digit = +line[i];
                if(digit > maxDigit) {
                    maxDigit = digit;
                    nextIndex = i;
                }
            }
            currentValue += maxDigit * Math.pow(10, 11 - digit);
            startIndex = nextIndex + 1;
        }

        total += currentValue;
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});