let lib = require('../../lib');

let year = 2021;
let day = 20;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let algoLine = lines.shift();
    let algo = algoLine.split('').map(x => x === '#' ? true : false);
    let grid = [];
    lines.shift();
    for(let line of lines) {
        grid.push(line.split('').map(x => x === '#' ? true : false));
    }

    let height = grid.length;
    let width = grid[0].length;

    for(let step = 0; step < 2; step++) {
        let empty = step === 0 ? '0' : '1';
        let lowerBound = -2 * (step + 1);
        height += 2;
        width += 2;
        let newGrid = [];
        for(let y = lowerBound; y < height; y++) {
            newGrid[y] = [];
            for(let x = lowerBound; x < width; x++) {
                let bin = '';
                for(let yy = y - 1; yy <= y + 1; yy++) {
                    for(let xx = x - 1; xx <= x + 1; xx++) {
                        if(!grid[yy] || grid[yy][xx] === undefined) {
                            bin += empty;
                        }
                        else if(grid[yy][xx]) {
                            bin += '1';
                        }
                        else {
                            bin += '0';
                        }
                    }
                }
                let val = parseInt(bin, 2);
                newGrid[y][x] = algo[val];
            }
        }
        grid = newGrid;
    }

    let count = 0;
    for(let y = -6; y <= grid.length + 6; y++) {
        for(let x = -6; x <= grid[0].length + 6; x++) {
            if(grid[y] && grid[y][x]) {
                count++;
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});