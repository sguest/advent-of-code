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
        let letter = policyParts[1];
        let password = parts[1].trim();
        let first = (password[+numParts[0]-1] === letter);
        let second = (password[+numParts[1]-1] === letter);

        if(first ^ second) {
            valid++;
        }
    }
    console.log(valid);
}).catch((err) => {
    console.log(err, err.stack);
});