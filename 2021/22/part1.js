let lib = require('../../lib');

let year = 2021;
let day = 22;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let cubes = [];
    for(let line of lines) {
        let parts = line.split(' ');
        let op = parts[0];
        parts = parts[1].split(',');
        let strs = {
            x: parts[0].substring(2),
            y: parts[1].substring(2),
            z: parts[2].substring(2),
        }

        let coords = {};
        for(let key in strs) {
            let split = strs[key].split('..');
            coords[key] = { min: Math.max(-50, +split[0]), max: Math.min(50, +split[1]) };
        }

        for(let x = coords.x.min + 50; x <= coords.x.max + 50; x++) {
            cubes[x] = cubes[x] || [];
            for(let y = coords.y.min + 50; y <= coords.y.max + 50; y++) {
                cubes[x][y] = cubes[x][y] || [];
                for(let z = coords.z.min + 50; z <= coords.z.max + 50; z++) {
                    if(op === 'on') {
                        cubes[x][y][z] = true;
                    }
                    else {
                        cubes[x][y][z] = false;
                    }
                }
            }
        }
    }

    let count = 0;
    for(let x = 0; x <= 100; x++) {
        for(let y = 0; y <= 100; y++) {
            for(let z = 0; z <= 100; z++) {
                if(cubes[x] && cubes[x][y] && cubes[x][y][z]) {
                    count++;
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});