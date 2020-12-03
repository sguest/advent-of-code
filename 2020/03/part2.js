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
    let slopes = [
        {x: 1, y: 1},
        {x: 3, y: 1},
        {x: 5, y: 1},
        {x: 7, y: 1},
        {x: 1, y: 2}
    ]

    let total = 1;
    for(let slope of slopes) {

    let x = 0;
    let y = 0;
    let width = rows[0].length;
        let trees = 0;
        while(y < rows.length) {
            if(!rows[y][x % width]) {
                trees++;
            }
            x += slope.x;
            y += slope.y;
        }

        total *= trees;
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});