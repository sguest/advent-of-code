let lib = require('../../lib');

let year = 2022;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    for(let line of lines) {
        let found = {};
        for(let i = 0; i < line.length / 2; i++) {
            found[line[i]] = true;
        }

        for(let i = line.length / 2; i < line.length; i++) {
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
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});