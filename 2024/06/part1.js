let lib = require('../../lib');

let year = 2024;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let current = {};
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++)
        {
            grid[x] ||= [];
            grid[x][y] = line[x] === '#';

            if(line[x] === '^')
            {
                current = { x, y };
            }
        }
    }
    let getCell = (x, y) => {
        return grid[x] && grid[x][y];
    }

    let width = lines[0].length;
    let height = lines.length;
    let facing = 'U';
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

    let visited = [];
    let count = 0;

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
            if(!visited[current.x][current.y]) {
                visited[current.x][current.y] = true;
                count++;
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

    console.log(count);

    // 4375 too high
}).catch((err) => {
    console.log(err, err.stack);
});