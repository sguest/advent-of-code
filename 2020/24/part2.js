let lib = require('../../lib');

let year = 2020;
let day = 24;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let deltas = {
        'e': { x: 1, y: -1 },
        'ne': { x: 1, y: 0 },
        'nw': { x: 0, y: 1 },
        'w': { x: -1, y: 1 },
        'sw': { x: -1, y: 0 },
        'se': { x: 0, y: -1 },
    };
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
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
        grid[x][y] = !grid[x][y];
        minX = Math.min(x, minX);
        maxX = Math.max(x, maxX);
        minY = Math.min(y, minY);
        maxY = Math.max(y, maxY);
    }

    for(let step = 0; step < 100; step++) {
        let newGrid = [];
        let bounds = {minX, minY, maxX, maxY};
        for(let x = bounds.minX - 1; x <= bounds.maxX + 1; x++) {
            newGrid[x] = newGrid[x] || [];
            for(let y = bounds.minY - 1; y <= bounds.maxY + 1; y++) {
                let nCount = 0;
                for(let direction in deltas) {
                    let delta = deltas[direction];
                    let nx = x + delta.x;
                    let ny = y + delta.y;
                    if(grid[nx] && grid[nx][ny]) {
                        nCount++;
                    }
                }
                let current = grid[x] && grid[x][y];
                if(current && nCount !== 1 && nCount !== 2) {
                    newGrid[x][y] = false;
                }
                else if(!current && nCount === 2) {
                    newGrid[x][y] = true;
                }
                else {
                    newGrid[x][y] = current;
                }
                if(newGrid[x][y]) {
                    minX = Math.min(x, minX);
                    maxX = Math.max(x, maxX);
                    minY = Math.min(y, minY);
                    maxY = Math.max(y, maxY);
                }
            }
        }
        grid = newGrid;
    }

    let count = 0;

    for(let x = minX; x <= maxX; x++) {
        if(grid[x]) {
            for(let y = minY; y <= maxY; y++) {
                if(grid[x][y]) {
                    count++;
                }
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});