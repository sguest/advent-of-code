let lib = require('../../lib');

let year = 2022;
let day = 18;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let cubes = [];
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;
    for(let line of lines) {
        let coords = line.split(',').map(x => +x);
        let [x, y, z] = coords;
        cubes[x] = cubes[x] || [];
        cubes[x][y] = cubes[x][y] || [];
        cubes[x][y][z] = true;
        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
        maxZ = Math.max(z, maxZ);
    }

    let getCube = (x, y, z) => {
        return cubes[x] && cubes[x][y] && cubes[x][y][z];
    }

    let start = { x: 0, y: 0, z: 0 };
    let queue = new lib.linkedList();
    queue.push(start);
    let visited = {};
    let deltas = [
        {x: 1, y: 0, z: 0},
        {x: -1, y: 0, z: 0},
        {x: 0, y: 1, z: 0},
        {x: 0, y: -1, z: 0},
        {x: 0, y: 0, z: 1},
        {x: 0, y: 0, z: -1},
    ];

    let count = 0;
    while(queue.length) {
        let current = queue.shift();
        let identifier = `${current.x},${current.y},${current.z}`
        if(!visited[identifier]) {
            visited[`${current.x},${current.y},${current.z}`] = true;

            for(let delta of deltas) {
                let newX = current.x + delta.x;
                let newY = current.y + delta.y;
                let newZ = current.z + delta.z;

                if(newX >= -1 && newY >= -1 && newZ >= -1 && newX <= maxX + 1 && newY <= maxY + 1 && newZ <= maxZ + 1) {
                    if(getCube(newX, newY, newZ)) {
                        count++;
                    }
                    else {
                        queue.push({ x: newX, y: newY, z: newZ });
                    }
                }
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});