let lib = require('../../lib');

let year = 2020;
let day = 11;

function getCell(grid, x, y) {
    if(!grid[x]) {
        return false;
    }

    return grid[x][y] === 2;
}

function countNeighbours(grid, x, y) {
    let count = 0;
    for(let xx = x-1; xx <= x + 1; xx++) {
        for(let yy = y-1; yy <= y + 1; yy++) {
            if((xx !== x || yy !== y) && getCell(grid, xx, yy)) {
                count++;
            }
        }
    }
    return count;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let x = 0;
    for(let line of lines) {
        grid[x] = [];
        for(let char of line) {
            grid[x].push(char === 'L' ? 1 : 0);
        }
        x++;
    }

    let width = grid.length;
    let height = grid[0].length;

    let changed = true;
    while(changed) {
        changed = false;
        let newGrid = [];
        for(let x = 0; x < width; x++) {
            newGrid[x] = [];
            for(let y = 0; y < height; y++) {
                if(grid[x][y] === 0) {
                    newGrid[x][y] = 0;
                }
                else {
                    let neighbours = countNeighbours(grid, x, y);
                    if(neighbours === 0) {
                        if(grid[x][y] === 1) {
                            changed = true;
                        }
                        newGrid[x][y] = 2;
                    }
                    else if(neighbours >= 4) {
                        if(grid[x][y] === 2) {
                            changed = true;
                        }
                        newGrid[x][y] = 1;
                    }
                    else {
                        newGrid[x][y] = grid[x][y];
                    }
                }
            }
        }

        grid = newGrid;
    }

    let count = 0;
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            if(grid[x][y] === 2) {
                count++;
            }
        }
    }
    console.log(count);

}).catch((err) => {
    console.log(err, err.stack);
});