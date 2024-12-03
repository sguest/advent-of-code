let lib = require('../../lib');

let year = 2019;
let day = 16;

lib.getInput(year, day).then((data) => {
    let values = data.split('').map(x => +x);
    let pattern = [0,1,0,-1];

    for(let phase = 0; phase < 100; phase++) {
        let newValues = [];
        for(let index = 1; index <= values.length; index++) {
            let total = 0;

            for(let index2 = 0; index2 < values.length; index2++) {
                let value = values[index2];
                let patternLength = pattern.length * index;
                let patternIndex = (index2 + 1) % patternLength;
                patternIndex = Math.floor(patternIndex / index);
                total += value * pattern[patternIndex];
            }
            total = total % 10;
            if(total < 0) {
                total *= -1;
            }
            newValues.push(total);
        }
        values = newValues;
    }

    console.log(values.slice(0, 8).join(''));
}).catch((err) => {
    console.log(err, err.stack);
});