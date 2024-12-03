let lib = require('../../lib');

let year = 2020;
let day = 2;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let valid = 0;
    for(let line of lines) {
        let parts = line.split(':');
        let policyParts = parts[0].split(' ');
        let numParts = policyParts[0].split('-');
        let min = +numParts[0];
        let max = +numParts[1];
        let letter = policyParts[1];
        let password = parts[1];
        let count = 0;
        for(let char of password) {
            if(char === letter) {
                count++;
            }
        }
        if(count >= min && count <= max) {
            valid++;
        }
    }
    console.log(valid);
}).catch((err) => {
    console.log(err, err.stack);
});