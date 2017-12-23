let lib = require('../../lib');

let year = 2017;
let day = 22;

lib.getInput(year, day).then((data) => {
    let grid = [];
    for(let line of data.split('\n')) {
        grid.push(line.split('').map(x => x === '#' ? 'I' : 'C'));
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

    let flaggedTurn = {
        U: 'D',
        D: 'U',
        L: 'R',
        R: 'L'
    }

    let count = 0;
    for(let it = 0; it < 10000000; it++) {
        if(!grid[position.y]) {
            grid[position.y] = [];
        }
        let current = grid[position.y][position.x] || 'C';
        if(current === 'I') {
            facing = infectedTurn[facing];
            grid[position.y][position.x] = 'F';
        }
        else if (current === 'C') {
            facing = cleanTurn[facing];
            grid[position.y][position.x] = 'W';
        }
        else if(current === 'W') {
            grid[position.y][position.x] = 'I';
            count++;
        }
        else if(current === 'F') {
            facing = flaggedTurn[facing];
            grid[position.y][position.x] = 'C';
        }
        let delta = deltas[facing];
        position.x += delta.x;
        position.y += delta.y;
    }

    console.log(count);
}).catch((err) => {
    console.log(err.stack);
});