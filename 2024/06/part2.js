let lib = require('../../lib');

let year = 2024;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let start = {};
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++)
        {
            grid[x] ||= [];
            grid[x][y] = line[x] === '#';

            if(line[x] === '^')
            {
                start = { x, y };
            }
        }
    }

    let width = lines[0].length;
    let height = lines.length;
    let deltas = {
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 },
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 },
    };
    let turns = {
        U: 'R',
        R: 'D',
        D: 'L',
        L: 'U',
    };

    let count = 0;

    for(let blockX = 0; blockX < width; blockX++)
    {
        for(let blockY = 0; blockY < width; blockY++)
        {
            let current = { ...start };
            let facing = 'U'
            let getCell = (x, y) => {
                return (x === blockX && y === blockY) || (grid[x] && grid[x][y]);
            }

            let visited = [];
            let done = false;
            while(!done)
            {
                if(current.x < 0 || current.x >= width || current.y < 0 || current.y >= height)
                {
                    done = true;
                }
                else
                {
                    visited[current.x] ||= [];
                    visited[current.x][current.y] ||= [];
                    if(visited[current.x][current.y].includes(facing)) {
                        count++;
                        done = true;
                    }
                    else {
                        visited[current.x][current.y].push(facing);
                    }
                    let target = { x: current.x + deltas[facing].x, y: current.y + deltas[facing].y };
                    if(getCell(target.x, target.y))
                    {
                        facing = turns[facing];
                    }
                    else {
                        current = target;
                    }
                }
            }
        }
    }

    console.log(count);

    // 4375 too high
}).catch((err) => {
    console.log(err, err.stack);
});