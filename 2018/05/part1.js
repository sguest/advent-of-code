let lib = require('../../lib');

let year = 2018;
let day = 5;

lib.getInput(year, day).then((data) => {
    let change = true;
    let oldLine = data;

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

    console.log(oldLine.length);
}).catch((err) => {
    console.log(err.stack);
});