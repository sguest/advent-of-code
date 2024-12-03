let lib = require('../../lib');

let year = 2023;
let day = 22;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let bricks = []
    for(let line of lines) {
        let [start, end] = line.split('~');
        let [x, y, z] = start.split(',').map(n => +n);
        let [endX, endY, endZ] = end.split(',').map(n => +n);
        let length = (endX - x) + (endY - y) + (endZ - z) + 1;
        let delta = { x: 0, y: 0, z: 0 };
        if(endX !== x) {
            delta.x = 1;
        }
        else if(endY !== y) {
            delta.y = 1;
        }
        else {
            delta.z = 1;
        }

        bricks.push({ x, y, z, delta, length, stopped: false, supported: [] });
    }

    let grid = [];
    let getGrid = (x, y, z) => grid[x] && grid[x][y] && grid[x][y][z];
    let setGrid = (x, y, z, val) => {
        grid[x] ||= [];
        grid[x][y] ||= [];
        grid[x][y][z] = val;
    }
    let getCubes = (brick) => {
        let cubes = [];
        for(let i = 0; i < brick.length; i++) {
            cubes.push({
                x: brick.x + brick.delta.x * i,
                y: brick.y + brick.delta.y * i,
                z: brick.z + brick.delta.z * i,
            })
        }
        return cubes;
    }

    while(bricks.some(b => !b.stopped)) {
        for(let brick of bricks.filter(b => !b.stopped)) {
            brick.z--;
        }

        let collision = true;
        while(collision) {
            collision = false;

            for(let brickId = 0; brickId < bricks.length; brickId++) {
                let brick = bricks[brickId];
                if(!brick.stopped) {
                    if(brick.z <= 0) {
                        brick.stopped = true;
                    }
                    else {
                        let cubes = getCubes(brick);
                        for(let cube of cubes) {
                            let collision = getGrid(cube.x, cube.y, cube.z);
                            if(collision !== undefined) {
                                brick.stopped = true;
                            }
                        }
                    }

                    if(brick.stopped) {
                        collision = true;
                        brick.z++;
                        let cubes = getCubes(brick);
                        for(let cube of cubes) {
                            setGrid(cube.x, cube.y, cube.z, brickId);
                        }
                    }
                }
            }
        }
    }

    for(let brickId = 0; brickId < bricks.length; brickId++) {
        let brick = bricks[brickId];
        let cubes = getCubes(brick);
        for(let cube of cubes) {
            let collision = getGrid(cube.x, cube.y, cube.z - 1);
            if(collision !== undefined && collision !== brickId && brick.supported.indexOf(collision) < 0) {
                brick.supported.push(collision);
            }
        }
    }

    let count = 0;
    for(let brickId = 0; brickId < bricks.length; brickId++) {
        let supportArray = bricks.map(b => [...b.supported]);

        let fallingIds = [brickId];
        let removedIds = [brickId];

        while(fallingIds.length) {
            let fallingId = fallingIds.pop();

            for(let targetId = 0; targetId < bricks.length; targetId++) {
                if(removedIds.indexOf(targetId) < 0) {
                    let targetSupport = supportArray[targetId];
                    let index = targetSupport.indexOf(fallingId);
                    if(index >= 0) {
                        targetSupport.splice(index, 1);
                        if(targetSupport.length === 0) {
                            fallingIds.push(targetId);
                            removedIds.push(targetId);
                            count++;
                        }
                    }
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});