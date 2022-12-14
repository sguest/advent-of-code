let lib = require('../../lib');

let year = 2022;
let day = 14;

function getPair(str) {
    let split = str.split(',');
    return { x: +split[0], y: +split[1] };
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let start = { x: 500, y: 0 };
    let grid = [];
    let maxY = 0;

    const addCell = (x, y) => {
        grid[y] = grid[y] || [];
        grid[y][x] = true;
        maxY = Math.max(y, maxY)
    }

    for(let line of lines) {
        let pairs = line.split(' -> ');
        let current = getPair(pairs.shift());
        addCell(current.x, current.y);

        for(let str of pairs) {
            let pair = getPair(str);
            let delta;
            if(pair.x === current.x) {
                if(pair.y > current.y) {
                    delta = { x: 0, y: 1 };
                }
                else {
                    delta = { x: 0, y: -1 };
                }
            }
            else if(pair.y === current.y) {
                if(pair.x > current.x) {
                    delta = { x: 1, y: 0 };
                }
                else {
                    delta = { x: -1, y: 0 };
                }
            }
            else {
                throw new Error('There are diagonals!?');
            }

            while(current.x !== pair.x || current.y !== pair.y) {
                current.x += delta.x;
                current.y += delta.y;
                addCell(current.x, current.y);
            }
        }
    }

    let floor = maxY + 2;
    let count = 0;

    while(true) {
        let sand = { ...start };
        let canMove = true;
        while(canMove) {
            if(sand.y === floor - 1) {
                canMove = false;
                addCell(sand.x, sand.y)
            }
            else if(grid[sand.y + 1]) {
                if(!grid[sand.y + 1][sand.x]) {
                    sand.y++;
                }
                else if(!grid[sand.y + 1][sand.x - 1]) {
                    sand.y++;
                    sand.x--;
                }
                else if(!grid[sand.y + 1][sand.x + 1]) {
                    sand.y++;
                    sand.x++;
                }
                else {
                    canMove = false;
                    addCell(sand.x, sand.y);
                }
            }
            else {
                sand.y++;
            }
        }

        count++;

        if(sand.x === start.x && sand.y === start.y) {
            console.log(count);
            process.exit(0);
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});