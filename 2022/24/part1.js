let lib = require('../../lib');

let year = 2022;
let day = 24;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let startX;
    let endX;
    let blizzards = [];
    let maxX = lines[0].length - 1;
    let maxY = lines.length - 1;
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            if(y === 0) {
                if(line[x] === '.') {
                    startX = x;
                }
            }
            else if(y === lines.length - 1) {
                if(line[x] === '.') {
                    endX = x;
                }
            }
            else {
                if(line[x] !== '.' && line[x] !== '#') {
                    blizzards.push({ x, y, facing: line[x] });
                }
            }
        }
    }

    let deltas = {
        'x': { x: 0, y: 0 },
        '<': { x: -1, y: 0 },
        '>': { x: 1, y: 0 },
        '^': { x: 0, y: -1 },
        'v': { x: 0, y: 1 },
    };

    let grids = [];

    const getGrid = step => {
        if(!grids[step]) {
            let newGrid = [];

            for(let blizzard of blizzards) {
                newGrid[blizzard.x] = newGrid[blizzard.x] || [];
                if(newGrid[blizzard.x][blizzard.y]) {
                    newGrid[blizzard.x][blizzard.y] = isNaN(newGrid[blizzard.x][blizzard.y]) ? 2 : newGrid[blizzard.x][blizzard.y] + 1;
                }
                else {
                    newGrid[blizzard.x][blizzard.y] = blizzard.facing;
                }

                let delta = deltas[blizzard.facing];

                blizzard.x += delta.x;
                if(blizzard.x <= 0) {
                    blizzard.x = maxX - 1;
                }
                if(blizzard.x >= maxX) {
                    blizzard.x = 1;
                }

                blizzard.y += delta.y;
                if(blizzard.y <= 0) {
                    blizzard.y = maxY - 1;
                }
                if(blizzard.y >= maxY) {
                    blizzard.y = 1;
                }
            }
            grids[step] = newGrid;
        }
        return grids[step];
    }

    getGrid(0);

    let visited = {};
    let start = { x: startX, y: 0, steps: 0 };
    let queue = new lib.linkedList();
    queue.push(start);
    while(queue.any()) {
        let current = queue.shift();
        let identifier = `${current.x},${current.y},${current.steps}`;
        if(!visited[identifier]) {
            visited[identifier] = true;
            let newGrid = getGrid(current.steps + 1);

            for(let direction in deltas) {
                let delta = deltas[direction];
                let targetX = current.x + delta.x;
                let targetY = current.y + delta.y;
                if(targetX === endX && targetY === maxY) {
                    console.log(current.steps + 1);
                    process.exit(0);
                }
                if(targetX > 0 && targetY > 0 && targetX < maxX && targetY < maxY && (!newGrid[targetX] || !newGrid[targetX][targetY])) {
                    queue.push({ x: targetX, y: targetY, steps: current.steps + 1 });
                }
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});