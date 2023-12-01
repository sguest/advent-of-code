let lib = require('../../lib');

let year = 2023;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sum = 0;
    for(let line of lines) {
        let i = 0;
        while(isNaN(line[i])) {
            i++;
        }
        let first = line[i];
        i = line.length - 1;
        while(isNaN(line[i])) {
            i--;
        }
        let num = first + line[i];
        sum += +num;
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});