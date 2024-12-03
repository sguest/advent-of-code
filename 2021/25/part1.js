let lib = require('../../lib');

let year = 2021;
let day = 25;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let line of lines) {
        grid.push(line.split('').map(x => x === '.' ? false : x));
    }
    let height = grid.length;
    let width = grid[0].length;

    let step = 0;
    while(true) {
        step++;
        let moved = false;
        let eastGrid = [];
        for(let y = 0; y < height; y++) {
            eastGrid[y] = [];
            for(let x = 0; x < width; x++) {
                if(grid[y][x] === '>') {
                    let targetX = (x + 1) % width;
                    if(grid[y][targetX]) {
                        eastGrid[y][x] = '>';
                    }
                    else {
                        eastGrid[y][targetX] = '>';
                        moved = true;
                    }
                }
            }
        }
        let southGrid = [];
        for(let y = 0; y < height; y++) {
            southGrid[y] = southGrid[y] || [];
            for(let x = 0; x < width; x++) {
                if(grid[y][x] === 'v') {
                    let targetY = (y + 1) % height;
                    if(grid[targetY][x] === 'v' || eastGrid[targetY][x] === '>') {
                        southGrid[y][x] = 'v';
                    }
                    else {
                        southGrid[targetY] = southGrid[targetY] || [];
                        southGrid[targetY][x] = 'v';
                        moved = true;
                    }
                }
            }
        }
        grid = [];
        for(let y = 0; y < height; y++) {
            grid[y] = [];
            for(let x = 0; x < width; x++) {
                if(eastGrid[y][x] === '>') {
                    grid[y][x] = '>';
                }
                else if(southGrid[y][x] === 'v') {
                    grid[y][x] = 'v';
                }
            }
        }

        if(!moved) {
            console.log(step);
            process.exit(0);
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});