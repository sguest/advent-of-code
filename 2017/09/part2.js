let lib = require('../../lib');

let year = 2017;
let day = 09;

lib.getInput(year, day).then((data) => {
    let isGarbage = false;
    let isCancelled = false;
    let score = 0;

    for(let char of data) {
        if(isGarbage) {
            if(isCancelled) {
                isCancelled = false;
            }
            else {
                if(char === '>') {
                    isGarbage = false;
                }
                else if(char === '!') {
                    isCancelled = true;
                }
                else {
                    score++;
                }
            }
        }
        else if(char === '<') {
            isGarbage = true;
        }
    }

    console.log(score);
});