let lib = require('../../lib');

let year = 2020;
let day = 24;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let count = 0;
    let deltas = {
        'e': { x: 1, y: -1 },
        'ne': { x: 1, y: 0 },
        'nw': { x: 0, y: 1 },
        'w': { x: -1, y: 1 },
        'sw': { x: -1, y: 0 },
        'se': { x: 0, y: -1 },
    };
    for(let line of lines) {
        let i = 0;
        let x = 0;
        let y = 0;
        while(i < line.length) {
            let command = line[i];
            i++
            if(command === 'n' || command === 's') {
                command += line[i];
                i++;
            }
            x += deltas[command].x;
            y += deltas[command].y;
        }

        grid[x] = grid[x] || [];
        if(grid[x][y]) {
            grid[x][y] = false;
            count--;
        }
        else {
            grid[x][y] = true;
            count++;
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});