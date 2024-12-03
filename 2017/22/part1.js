let lib = require('../../lib');

let year = 2017;
let day = 22;

lib.getInput(year, day).then((data) => {
    let grid = [];
    for(let line of data.split('\n')) {
        grid.push(line.split('').map(x => x === '#'));
    }

    let position = {
        x: Math.floor(grid[0].length / 2),
        y: Math.floor(grid.length / 2)
    }

    let facing = 'U';

    let deltas = {
        U: {x:0, y: -1},
        D: {x: 0, y: 1},
        L: {x: -1, y: 0},
        R: {x: 1, y: 0}
    }

    let cleanTurn = {
        U: 'L',
        L: 'D',
        D: 'R',
        R: 'U'
    }

    let infectedTurn = {
        U: 'R',
        R: 'D',
        D: 'L',
        L: 'U'
    }

    let count = 0;
    for(let it = 0; it < 10000; it++) {
        if(!grid[position.y]) {
            grid[position.y] = [];
        }
        if(grid[position.y][position.x]) {
            facing = infectedTurn[facing];
        }
        else {
            facing = cleanTurn[facing];
            count++;
        }
        grid[position.y][position.x] = !grid[position.y][position.x];
        let delta = deltas[facing];
        position.x += delta.x;
        position.y += delta.y;
    }

    console.log(count);
}).catch((err) => {
    console.log(err.stack);
});