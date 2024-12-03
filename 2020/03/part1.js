let lib = require('../../lib');

let year = 2020;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let rows = [];
    for(let line of lines) {
        let row = [];
        for(let char of line) {
            if(char === '#') {
                row.push(false);
            }
            else {
                row.push(true);
            }
        }
        rows.push(row)
    }
    let x = 0;
    let y = 0;
    let width = rows[0].length;

    let trees = 0;
    while(y < rows.length) {
        if(!rows[y][x % width]) {
            trees++;
        }
        x += 3;
        y++;
    }
    console.log(trees);
}).catch((err) => {
    console.log(err, err.stack);
});