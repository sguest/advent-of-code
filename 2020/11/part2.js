let lib = require('../../lib');

let year = 2020;
let day = 11;

let width = 0;
let height = 0;

function getCell(grid, x, y, xx, yy) {
    x += xx;
    y += yy;
    while(x >= 0 && x < width && y >= 0 && y < height) {
        if(grid[x][y] === 2) {
            return true;
        }
        if(grid[x][y] === 1) {
            return false;
        }
        x += xx;
        y += yy;
    }
    return false;
}

function countNeighbours(grid, x, y) {
    let count = 0;
    for(let xx = -1; xx <= 1; xx++) {
        for(let yy = -1; yy <= 1; yy++) {
            if((xx !== 0 || yy !== 0) && getCell(grid, x, y, xx, yy)) {
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

    width = grid.length;
    height = grid[0].length;

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
                    else if(neighbours >= 5) {
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