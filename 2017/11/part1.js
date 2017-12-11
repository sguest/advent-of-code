let lib = require('../../lib');

let year = 2017;
let day = 11;

lib.getInput(year, day).then((data) => {
    let current = {x: 0, y: 0, z: 0};
    let deltas = {
        n: {y: 1, z: -1, x:0},
        ne: {x: 1, z: -1, y: 0},
        se: {x: 1, y: -1, z: 0},
        s: {y: -1, z: 1, x: 0},
        sw: {x: -1, z: 1, y: 0},
        nw: {x: -1, y: 1, z: 0}

    }
    let path = data.split(',');
    for(let step of path) {
        let delta = deltas[step];
        current.x += delta.x;
        current.y += delta.y;
        current.z += delta.z;
    }

    console.log((Math.abs(current.x) + Math.abs(current.y) + Math.abs(current.z)) / 2);
});