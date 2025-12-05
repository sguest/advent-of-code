let lib = require('../../lib');

let year = 2025;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let grid = [];
    
    for(let line of lines)
    {
        grid.push(line.split(''));
    }

    const getCell = (x, y) => {
        return grid[y] && grid[y][x] === '@';
    }

    let done = false;
    let removed = 0;

    while(!done)
    {
        done = true;
        let newGrid = [];

        for(let y = 0; y < grid.length; y++)
        {
            newGrid[y] = [];
            for(let x = 0; x < grid[y].length; x++) {
                if(getCell(x, y)) {
                    let adjacent = 0;
                    for(let xx = x - 1; xx <= x + 1; xx++)
                    {
                        for(let yy = y - 1; yy <= y + 1; yy++)
                        {
                            if((x != xx || y != yy) && getCell(xx, yy)) {
                                adjacent++;
                            }
                        }
                    }
                    if(adjacent < 4) {
                        done = false;
                        removed++;
                        newGrid[y][x] = '.';
                    }
                    else
                    {
                        newGrid[y][x] = grid[y][x];
                    }
                }
                else
                {
                    newGrid[y][x] = grid[y][x];
                }
            }
        }

        grid = newGrid;
    }

    console.log(removed);
}).catch((err) => {
    console.log(err, err.stack);
});