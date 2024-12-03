let lib = require('../../lib');

let year = 2022;
let day = 23;

function setElf(grid, x , y, bounds) {
    grid[x] = grid[x] || [];
    grid[x][y] = true;

    bounds.minX = Math.min(bounds.minX, x);
    bounds.maxX = Math.max(bounds.maxX, x);
    bounds.minY = Math.min(bounds.minY, y);
    bounds.maxY = Math.max(bounds.maxY, y);
}

function getElf(grid, x, y) {
    return grid[x] && grid[x][y];
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let bounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            if(line[x] === '#') {
                setElf(grid, x, y, bounds);
            }
        }
    }

    let deltas = [
        { test: [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }] , move: { x: 0, y: -1 } },
        { test: [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }] , move: { x: 0, y: 1 } },
        { test: [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }] , move: { x: -1, y: 0 } },
        { test: [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }] , move: { x: 1, y: 0 } },
    ]

    let step = 0;
    while(true) {
        step++;
        let proposedMoves = {};
        let proposedCount = {};
        for(let x = bounds.minX; x <= bounds.maxX; x++) {
            for(let y = bounds.minY; y <= bounds.maxY; y++) {
                if(getElf(grid, x, y)) {
                    let coords = `${x},${y}`;
                    let target = null;
                    let neighbour = false;
                    for(let xx = x - 1; xx <= x + 1; xx++) {
                        for(let yy = y - 1; yy <= y + 1; yy++) {
                            if((xx !== x || yy !== y) && getElf(grid, xx, yy)) {
                                neighbour = true;
                            }
                        }
                    }

                    if(neighbour) {
                        for(let delta of deltas) {
                            if(!target) {
                                let found = false;
                                for(let test of delta.test) {
                                    found = found || getElf(grid, x + test.x, y + test.y);
                                }
                                if(!found) {
                                    target = { x: x + delta.move.x, y: y + delta.move.y };
                                }
                            }
                        }
                    }

                    target = target || { x, y };

                    if(target) {
                        proposedMoves[coords] = target;
                        targetCoords = `${target.x},${target.y}`;
                        proposedCount[targetCoords] = (proposedCount[targetCoords] || 0) + 1;
                    }
                }
            }
        }

        let newGrid = [];
        let newBounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };

        let hasMoved = false;
        for(let key in proposedMoves) {
            let [oldX, oldY] = key.split(',').map(n => +n);
            let target = proposedMoves[key];
            let targetCoords = `${target.x},${target.y}`;
            let targetCount = proposedCount[targetCoords];

            if(targetCount === 1) {
                setElf(newGrid, target.x, target.y, newBounds);
                if(target.x !== oldX || target.y !== oldY) {
                    hasMoved = true;
                }
            }
            else {
                setElf(newGrid, oldX, oldY, newBounds);
            }
        }

        if(!hasMoved) {
            console.log(step);
            process.exit(0);
        }

        grid = newGrid,
        bounds = newBounds;

        deltas.push(deltas.shift());
    }
}).catch((err) => {
    console.log(err, err.stack);
});