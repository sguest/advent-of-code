let lib = require('../../lib');

let year = 2019;
let day = 24;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            grid[x] = grid[x] || [];
            grid[x][y] = (line[x] === '#');
        }
    }

    let visited = {};

    while(true) {
        let signature = '';
        for(let line of grid) {
            for(let item of line) {
                signature += (item ? '#' : '.');
            }
        }

        if(visited[signature]) {
            let total = 0;
            let value = 1;

            for(let y = 0; y < 5; y++) {
                for(let x = 0; x < 5; x++) {
                    if(grid[x][y]) {
                        total += value;
                    }
                    value *= 2;
                }
            }

            console.log(total);
            process.exit(0);
        }
        else {
            visited[signature] = true;
        }

        let newGrid = [];

        for(let x = 0; x < 5; x++) {
            newGrid[x] = newGrid[x] || [];
            for(let y = 0; y < 5; y++) {
                let left = grid[x - 1] || [];
                let right = grid[x + 1] || [];

                let count = 0;
                if(left[y]) {
                    count++;
                }
                if(right[y]) {
                    count++;
                }
                if(grid[x][y-1]) {
                    count++;
                }
                if(grid[x][y+1]) {
                    count++;
                }

                if(grid[x][y] && count !== 1) {
                    newGrid[x][y] = false;
                }
                else if(!grid[x][y] && (count === 1 || count === 2)) {
                    newGrid[x][y] = true;
                }
                else {
                    newGrid[x][y] = grid[x][y];
                }
            }
        }
        grid = newGrid;
    }
}).catch((err) => {
    console.log(err, err.stack);
});