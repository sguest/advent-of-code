let lib = require('../../lib');

let year = 2020;
let day = 17;

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;
let minZ = Infinity;
let maxZ = -Infinity;
let minW = Infinity;
let maxW = -Infinity;

function set(grid, x, y, z, w, val) {
    grid[x] = grid[x] || [];
    grid[x][y] = grid[x][y] || [];
    grid[x][y][z] = grid[x][y][z] || [];
    grid[x][y][z][w] = val;
    let delta = val ? 1 : 0;
    minX = Math.min(x - delta, minX);
    maxX = Math.max(x + delta, maxX);
    minY = Math.min(y - delta, minY);
    maxY = Math.max(y + delta, maxY);
    minZ = Math.min(z - delta, minZ);
    maxZ = Math.max(z + delta, maxZ);
    minW = Math.min(w - delta, minW);
    maxW = Math.max(w + delta, maxW);
}

function get(grid, x, y, z, w) {
    return !!(grid[x] && grid[x][y] && grid[x][y][z] && grid[x][y][z][w]);
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let x = 0; x < lines.length; x++) {
        let line = lines[x];
        for(let y = 0; y < line.length; y++) {
            set(grid, x, y, 0, 0, line[y] === '#');
        }
    }

    for(let step = 0; step < 6; step++) {
        let newGrid = [];
        let xSize = maxX;
        let ySize = maxY;
        let zSize = maxZ;
        let wSize = maxW;
        for(let x = minX; x <= xSize; x++) {
            for(let y = minY; y <= ySize; y++) {
                for(let z = minZ; z <= zSize; z++) {
                    for(let w = minW; w <= wSize; w++) {
                        let current = get(grid, x, y, z, w);
                        let found = 0;
                        for(let xx = x - 1; xx <= x + 1; xx++) {
                            for(let yy = y - 1; yy <= y + 1; yy++) {
                                for(let zz = z - 1; zz <= z + 1; zz++) {
                                    for(let ww = w - 1; ww <= w + 1; ww++) {
                                        if(x !== xx || y !== yy || z !== zz || w !== ww) {
                                            if(get(grid, xx, yy, zz, ww)) {
                                                found++;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if(current) {
                            if(found === 2 || found === 3) {
                                set(newGrid, x, y, z, w, true);
                            }
                            else {
                                set(newGrid, x, y, z, w, false);
                            }
                        }
                        else {
                            if(found === 3) {
                                set(newGrid, x, y, z, w, true);
                            }
                            else {
                                set(newGrid, x, y, z, w, false);
                            }
                        }
                    }
                }
            }
        }
        grid = newGrid;
    }

    let count = 0;
    for(let x = minX; x <= maxX; x++) {
        for(let y = minY; y <= maxY; y++) {
            for(let z = minZ; z <= maxZ; z++) {
                for(let w = minW; w <= maxW; w++) {
                    if(get(grid, x, y, z, w)) {
                        count ++;
                    }
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});

// 166 too low