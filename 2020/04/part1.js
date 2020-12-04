let lib = require('../../lib');

let year = 2020;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let foundFields = [];
    let valid = 0;
    for(let line of lines) {
        if(!line.trim()) {
            if(foundFields.length === 8 || (foundFields.length === 7 && foundFields.indexOf('cid') === -1)) {
                valid++;
            }
            foundFields = [];
        }
        else {
            let parts = line.split(' ');
            for(let part of parts) {
                foundFields.push(part.split(':')[0]);
            }
        }
    }

    console.log(valid);
}).catch((err) => {
    console.log(err, err.stack);
});