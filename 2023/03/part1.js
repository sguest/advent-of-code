let lib = require('../../lib');

let year = 2023;
let day = 3;

function isSymbol(c) {
    return c !== undefined && isNaN(c) && c !== '.';
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sum = 0;
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let above = lines[i - 1] || [];
        let below = lines[i + 1] || [];

        let x = 0;
        while(x < line.length) {
            let numString = '';
            let startX = x;
            while(!isNaN(line[x])) {
                numString += line[x];
                x++;
            }
            endX = x - 1;
            let found = false;
            if(isSymbol(line[startX - 1]) || isSymbol(line[endX + 1]))  {
                found = true;
            }
            for(let xx = startX - 1; xx <= endX + 1; xx++) {
                if(isSymbol(above[xx]) || isSymbol(below[xx])) {
                    found = true;
                }
            }
            if(found) {
                sum += (+numString)
            }
            x++;
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});