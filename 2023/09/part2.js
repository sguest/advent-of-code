let lib = require('../../lib');

let year = 2023;
let day = 9;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sum = 0;
    for(let line of lines) {
        let values = line.split(' ').map(x => +x);
        let sequences = [values];
        while(values.some(x => x !== 0)) {
            let newSequence = [];
            for(let i = 1; i < values.length; i++) {
                newSequence.push(values[i] - values[i - 1]);
            }
            sequences.push(newSequence);
            values = newSequence;
        }

        for(let i = sequences.length - 1; i > 0; i--) {
            let current = sequences[i];
            let prev = sequences[i - 1];
            prev.unshift(prev[0] - current[0]);
        }

        sum += sequences[0][0];
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});