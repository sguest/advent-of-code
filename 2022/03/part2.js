let lib = require('../../lib');

let year = 2022;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    let index = 0;
    let found;
    for(let line of lines) {
        if(index === 0) {
            found = {};
            for(let i = 0; i < line.length; i++) {
                found[line[i]] = true;
            }
            index = 1;
        }
        else if(index === 1) {
            let newFound = {};
            for(let i = 0; i < line.length; i++) {
                if(found[line[i]]) {
                    newFound[line[i]] = true;
                }
            }
            found = newFound;
            index = 2;
        }
        else {
            for(let i = 0; i < line.length; i++) {
                let char = line[i];
                if(found[char]) {
                    if(/[A-Z]/.test(char)) {
                        total += char.charCodeAt(0) - 38;
                    }
                    else {
                        total += char.charCodeAt(0) - 96;
                    }
                    break;
                }
            }
            index = 0;
        }
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});