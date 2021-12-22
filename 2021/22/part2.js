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
            coords[key] = { min: +split[0], max: +split[1] };
        }

        let newCubes = [];

        for(let cube of cubes) {
            let intersect = cube.x.min <= coords.x.max
                && cube.x.max >= coords.x.min
                && cube.y.min <= coords.y.max
                && cube.y.max >= coords.y.min
                && cube.z.min <= coords.z.max
                && cube.z.max >= coords.z.min;

            if(intersect) {
                if(cube.x.min <= coords.x.min && cube.x.max >= coords.x.min) {
                    newCubes.push({
                        x: { min: cube.x.min, max: coords.x.min - 1 },
                        y: { min: cube.y.min, max: cube.y.max },
                        z: { min: cube.z.min, max: cube.z.max },
                    })
                    cube.x.min = coords.x.min;
                    intersect = true;
                }

                if(cube.x.max >= coords.x.max && cube.x.min <= coords.x.max) {
                    newCubes.push({
                        x: { min: coords.x.max + 1, max: cube.x.max },
                        y: { min: cube.y.min, max: cube.y.max },
                        z: { min: cube.z.min, max: cube.z.max },
                    })
                    cube.x.max = coords.x.max;
                    intersect = true;
                }

                if(cube.y.min <= coords.y.min && cube.y.max >= coords.y.min) {
                    newCubes.push({
                        x: { min: cube.x.min, max: cube.x.max },
                        y: { min: cube.y.min, max: coords.y.min - 1 },
                        z: { min: cube.z.min, max: cube.z.max },
                    })
                    cube.y.min = coords.y.min;
                    intersect = true;
                }

                if(cube.y.max >= coords.y.max && cube.y.min <= coords.y.max) {
                    newCubes.push({
                        x: { min: cube.x.min, max: cube.x.max },
                        y: { min: coords.y.max + 1, max: cube.y.max },
                        z: { min: cube.z.min, max: cube.z.max },
                    })
                    cube.y.max = coords.y.max;
                    intersect = true;
                }

                if(cube.z.min <= coords.z.min && cube.z.max >= coords.z.min) {
                    newCubes.push({
                        x: { min: cube.x.min, max: cube.x.max },
                        y: { min: cube.y.min, max: cube.y.max },
                        z: { min: cube.z.min, max: coords.z.min - 1 },
                    })
                    cube.z.min = coords.z.min;
                    intersect = true;
                }

                if(cube.z.max >= coords.z.max && cube.z.min <= coords.z.max) {
                    newCubes.push({
                        x: { min: cube.x.min, max: cube.x.max },
                        y: { min: cube.y.min, max: cube.y.max },
                        z: { min: coords.z.max + 1, max: cube.z.max },
                    })
                    cube.z.max = coords.z.max;
                    intersect = true;
                }
            }
            else {
                newCubes.push(cube);
            }
        }

        if(op === 'on') {
            newCubes.push(coords);
        }

        cubes = newCubes;
    }

    let count = 0;

    for(let cube of cubes) {
        count += (cube.x.max - cube.x.min + 1) * (cube.y.max - cube.y.min + 1) * (cube.z.max - cube.z.min + 1);
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});