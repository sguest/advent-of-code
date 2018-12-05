let lib = require('../../lib');

let year = 2018;
let day = 5;

lib.getInput(year, day).then((data) => {
    let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let bestScore = Infinity;

    for(let letter of letters) {
        let change = true;
        let oldLine = data;

        let remover = new RegExp(letter, 'gi');

        oldLine = oldLine.replace(remover, '');

        while(change) {
            change = false;
            let newLine = '';

            let i = 0;
            while(i < oldLine.length) {
                let current = oldLine[i];
                let next = oldLine[i + 1];

                if(next && current !== next && current.toLowerCase() ===  next.toLowerCase()) {
                    i+=2;
                    change = true;
                }
                else {
                    newLine += current;
                    i++;
                }
            }

            oldLine = newLine;
        }

        if(oldLine.length < bestScore) {
            bestScore = oldLine.length;
        }
    }

    console.log(bestScore);
}).catch((err) => {
    console.log(err.stack);
});