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

    let count = 0;
    for(let x = 0; x <= maxX; x++) {
        for(let y = 0; y <= maxY; y++) {
            for(let z = 0; z <= maxZ; z++) {
                if(getCube(x, y, z)) {
                    if(!getCube(x + 1, y, z)) count++;
                    if(!getCube(x - 1, y, z)) count++;
                    if(!getCube(x, y + 1, z)) count++;
                    if(!getCube(x, y - 1, z)) count++;
                    if(!getCube(x, y, z + 1)) count++;
                    if(!getCube(x, y, z - 1)) count++;
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});