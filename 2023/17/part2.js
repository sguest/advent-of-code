let lib = require('../../lib');

let year = 2023;
let day = 17;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            grid[x] = grid[x] || [];
            grid[x][y] = +line[x];
        }
    }

    let deltas = {
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 },
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 },
    }

    let across = {
        U: 'D',
        D: 'U',
        L: 'R',
        R: 'L',
    }

    let maxX = grid.length - 1;
    let maxY = grid[0].length - 1;

    let queue0 = new lib.linkedList();
    let queues = [queue0];
    queue0.push({ x: 0, y: 0, straight: 0, dir: 'R' });
    queue0.push({ x: 0, y: 0, straight: 0, dir: 'D' });
    let minLoss = 0;
    let visited = {};

    while(true) {
        while(!queues[minLoss]?.length) {
            minLoss++;
            //console.log(minLoss);
        }
        let current = queues[minLoss].shift();
        if(current.x === maxX && current.y === maxY && current.straight >= 3) {
            console.log(minLoss);
            process.exit(0);
        }
        let key = `${current.x},${current.y},${current.straight},${current.dir}`;
        if(!visited[key]) {
            //console.log(current);
            visited[key] = true;
            for(let dir in deltas) {
                if(dir !== across[current.dir] && (current.straight >= 3 || current.dir === dir)) {
                    let delta = deltas[dir];
                    let dest = { x: current.x + delta.x, y: current.y + delta.y, straight: 0, dir };
                    if(dest.x >= 0 && dest.x <= maxX && dest.y >= 0 && dest.y <= maxY) {
                        if(dir === current.dir) {
                            dest.straight = current.straight + 1;
                        }
                        if(dest.straight < 10) {
                            let loss = minLoss + grid[dest.x][dest.y];
                            queues[loss] = queues[loss] || new lib.linkedList();
                            queues[loss].push(dest);
                        }
                    }
                }
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});