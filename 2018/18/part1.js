let lib = require('../../lib');

let year = 2018;
let day = 18;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let x = 0; x < lines[0].length; x++) {
        grid.push([]);
    }
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            grid[x][y] = lines[x][y];
        }
    }

    for(let minute = 0; minute < 10; minute++) {
        let newGrid = [];
        for(let x = 0; x < grid[0].length; x++) 
        {
            newGrid.push([]);
        }

        for(let x = 0; x < grid.length; x++) {
            for(let y = 0; y < grid[x].length; y++) {
                let numTrees = 0;
                let numYards = 0;

                for(let xx = x - 1; xx <= x + 1; xx++) {
                    for(let yy = y - 1; yy <= y + 1; yy++) {
                        if(grid[xx] && grid[xx][yy] === '|') {
                            numTrees++;
                        }
                        else if(grid[xx] && grid[xx][yy] === '#') {
                            numYards++;
                        }
                    }
                }

                if(grid[x][y] === '.') {
                    if(numTrees >= 3) {
                        newGrid[x][y] = '|';
                    }
                    else {
                        newGrid[x][y] = '.';
                    }
                }
                else if(grid[x][y] === '|') {
                    if(numYards >= 3) {
                        newGrid[x][y] = '#'
                    }
                    else {
                        newGrid[x][y] = '|';
                    }
                }
                else if(grid[x][y] === '#') {
                    if(numYards >= 2 && numTrees >= 1) {
                        newGrid[x][y] = '#';
                    }
                    else {
                        newGrid[x][y] = '.';
                    }
                }
            }
        }
        grid = newGrid;
    }

    let numTrees = 0;
    let numYards = 0;
    for(let x = 0; x < grid.length; x++) {
        for(let y = 0; y < grid[x].length; y++) {
            if(grid[x][y] === '|') {
                numTrees++;
            }
            else if(grid[x][y] === '#') {
                numYards++;
            }
        }
    }

    console.log(numTrees * numYards);
}).catch((err) => {
    console.log(err.stack);
});