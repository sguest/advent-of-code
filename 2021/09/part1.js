let lib = require('../../lib');

let year = 2021;
let day = 9;

function get(lines, x, y) {
    if(!lines[x]) {
        return Infinity;
    }
    if(lines[x][y] === undefined) {
        return Infinity
    }
    return +lines[x][y];
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for(let j = 0; j < line.length; j++) {
            let val = +line[j];
            if(get(lines, i-1, j) > val && get(lines, i+1, j) > val && get(lines, i, j-1) > val && get(lines, i, j+1) > val) {
                total += val + 1;
            }
        }
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});