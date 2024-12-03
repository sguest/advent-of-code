let lib = require('../../lib');

let year = 2023;
let day = 14;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let rocks = [];
    for(let line of lines) {
        rocks.push(line.split(''));
    }

    let moved = true;
    while(moved) {
        moved = false;
        for(let y = 1; y < rocks.length; y++) {
            for(let x = 0; x < rocks[y].length; x++) {
                if(rocks[y - 1][x] === '.' && rocks[y][x] === 'O') {
                    rocks[y - 1][x] = 'O';
                    rocks[y][x] = '.';
                    moved = true;
                }
            }
        }
    }

    let load = 0;
    let height = rocks.length;
    for(let y = 0; y < rocks.length; y++) {
        for(let x = 0; x < rocks[y].length; x++) {
            if(rocks[y][x] === 'O') {
                load += height - y;
            }
        }
    }
    console.log(load);
}).catch((err) => {
    console.log(err, err.stack);
});