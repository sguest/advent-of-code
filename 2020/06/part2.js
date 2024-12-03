let lib = require('../../lib');

let year = 2020;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    let groupLetters = [];
    let newGroup = true;
    for(let line of lines) {
        if(!line) {
            total += groupLetters.length;
            groupLetters = [];
            newGroup = true;
        }
        else {
            if(newGroup) {
                groupLetters = line.split('');
                newGroup = false;
            }
            else {
                let newLetters = [];
                for(let char of line) {
                    if(groupLetters.indexOf(char) !== -1) {
                        newLetters.push(char);
                    }
                }
                groupLetters = newLetters;
            }
        }
    }

    total += groupLetters.length;
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});