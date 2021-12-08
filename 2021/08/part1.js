let lib = require('../../lib');

let year = 2021;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let samples = [];
    let outputs = [];
    for(let line of lines) {
        let parts = line.split(' | ');
        samples.push(parts[0].split(' '));
        outputs.push(parts[1].split(' '));
    }

    let count = 0;
    for(let output of outputs) {
        for(let item of output) {
            if(item.length === 2 || item.length === 3 || item.length === 4 || item.length === 7) {
                count++;
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});