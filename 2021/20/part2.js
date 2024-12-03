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

    let maxY = grid.length;
    let minY = 0;
    let maxX = grid[0].length;
    let minX = 0;

    for(let step = 0; step < 50; step++) {
        let empty = step % 2 ? '1' : '0';
        maxY += 2;
        minY -= 2;
        maxX += 2;
        minX -= 2;
        let newGrid = [];
        for(let y = minY; y < maxY; y++) {
            newGrid[y] = [];
            for(let x = minX; x < maxX; x++) {
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
    for(let y = minY; y <= maxY; y++) {
        for(let x = minX; x <= maxX; x++) {
            if(grid[y] && grid[y][x]) {
                count++;
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});