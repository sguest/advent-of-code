let lib = require('../../lib');

let year = 2021;
let day = 19;

function rotate(pos, rotation) {
    return {
        x: pos[rotation.x.dir] * rotation.x.mult,
        y: pos[rotation.y.dir] * rotation.y.mult,
        z: pos[rotation.z.dir] * rotation.z.mult,
    }
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let scanners = [];
    let currentScanner;
    for(let line of lines) {
        if(line) {
            if(line[1] === '-') {
                if(currentScanner) {
                    scanners.push(currentScanner);
                }
                currentScanner = { beacons: [], diffs: [] };
            }
            else {
                let coords = line.split(',').map(x => +x);
                currentScanner.beacons.push({ x: coords[0], y: coords[1], z: coords[2] });
            }
        }
    }
    scanners.push(currentScanner);

    let rotations = [
        { x: { dir: 'x', mult: 1 }, y: { dir: 'y', mult: 1 }, z: { dir: 'z', mult: 1 } },
        { x: { dir: 'x', mult: 1 }, y: { dir: 'z', mult: -1 }, z: { dir: 'y', mult: 1 } },
        { x: { dir: 'x', mult: 1 }, y: { dir: 'y', mult: -1 }, z: { dir: 'z', mult: -1 } },
        { x: { dir: 'x', mult: 1 }, y: { dir: 'z', mult: 1 }, z: { dir: 'y', mult: -1 } },
        { x: { dir: 'x', mult: -1 }, y: { dir: 'y', mult: 1 }, z: { dir: 'z', mult: -1 } },
        { x: { dir: 'x', mult: -1 }, y: { dir: 'z', mult: 1 }, z: { dir: 'y', mult: 1 } },
        { x: { dir: 'x', mult: -1 }, y: { dir: 'y', mult: -1 }, z: { dir: 'z', mult: 1 } },
        { x: { dir: 'x', mult: -1 }, y: { dir: 'z', mult: -1 }, z: { dir: 'y', mult: -1 } },
        { x: { dir: 'y', mult: 1 }, y: { dir: 'x', mult: -1 }, z: { dir: 'z', mult: 1 } },
        { x: { dir: 'y', mult: 1 }, y: { dir: 'z', mult: -1 }, z: { dir: 'x', mult: -1 } },
        { x: { dir: 'y', mult: 1 }, y: { dir: 'x', mult: 1 }, z: { dir: 'z', mult: -1 } },
        { x: { dir: 'y', mult: 1 }, y: { dir: 'z', mult: 1 }, z: { dir: 'x', mult: 1 } },
        { x: { dir: 'y', mult: -1 }, y: { dir: 'x', mult: 1 }, z: { dir: 'z', mult: 1 } },
        { x: { dir: 'y', mult: -1 }, y: { dir: 'z', mult: -1 }, z: { dir: 'x', mult: 1 } },
        { x: { dir: 'y', mult: -1 }, y: { dir: 'x', mult: -1 }, z: { dir: 'z', mult: -1 } },
        { x: { dir: 'y', mult: -1 }, y: { dir: 'z', mult: 1 }, z: { dir: 'x', mult: -1 } },
        { x: { dir: 'z', mult: 1 }, y: { dir: 'y', mult: 1 }, z: { dir: 'x', mult: -1 } },
        { x: { dir: 'z', mult: 1 }, y: { dir: 'x', mult: 1 }, z: { dir: 'y', mult: 1 } },
        { x: { dir: 'z', mult: 1 }, y: { dir: 'y', mult: -1 }, z: { dir: 'x', mult: 1 } },
        { x: { dir: 'z', mult: 1 }, y: { dir: 'x', mult: -1 }, z: { dir: 'y', mult: -1 } },
        { x: { dir: 'z', mult: -1 }, y: { dir: 'y', mult: 1 }, z: { dir: 'x', mult: 1 } },
        { x: { dir: 'z', mult: -1 }, y: { dir: 'x', mult: -1 }, z: { dir: 'y', mult: 1 } },
        { x: { dir: 'z', mult: -1 }, y: { dir: 'y', mult: -1 }, z: { dir: 'x', mult: -1 } },
        { x: { dir: 'z', mult: -1 }, y: { dir: 'x', mult: 1 }, z: { dir: 'y', mult: -1 } },
    ]

    for(let scanner of scanners) {
        for(let i = 0; i < scanner.beacons.length; i++) {
            for(let j = 0; j < scanner.beacons.length; j++) {
                if(i !== j) {
                    scanner.diffs.push({
                        id1: i,
                        id2: j,
                        x: scanner.beacons[i].x - scanner.beacons[j].x,
                        y: scanner.beacons[i].y - scanner.beacons[j].y,
                        z: scanner.beacons[i].z - scanner.beacons[j].z,
                    });
                }
            }
        }
    }

    let absolutes = {
        0: {
            x: 0,
            y: 0,
            z: 0,
            rotation: rotations[0],
        }
    };

    let relatives = {};

    for(let i = 0; i < scanners.length; i++) {
        console.log('on', i);
        let left = scanners[i];
        for(let j = 0; j < scanners.length; j++) {
            if(i !== j) {
                let right = scanners[j];
                for(let rotation of rotations) {
                    let firstLeft;
                    let firstRight;
                    let count = 0;
                    for(let leftDiff of left.diffs) {
                        let found = false;
                        for(let rightDiff of right.diffs) {
                            if(!found) {
                                let rotated = rotate(rightDiff, rotation);

                                if(leftDiff.x === rotated.x && leftDiff.y === rotated.y && leftDiff.z === rotated.z) {
                                    found = true;
                                    count++;
                                    if(firstLeft === undefined) {
                                        firstLeft = leftDiff.id1;
                                        firstRight = rightDiff.id1;
                                    }
                                }
                            }
                        }
                    }
                    if(count >= 12) {
                        let leftBeacon = left.beacons[firstLeft];
                        let rightBeacon = right.beacons[firstRight];
                        let rightRotated = rotate(rightBeacon, rotation);
                        let relative = {
                            x: leftBeacon.x - rightRotated.x,
                            y: leftBeacon.y - rightRotated.y,
                            z: leftBeacon.z - rightRotated.z,
                            rotation
                        }
                        if(i === 0) {
                            absolutes[j] = relative;
                        }
                        else {
                            relatives[j] = relatives[j] || {};
                            relatives[j][i] = relative;
                        }
                    }
                }
            }
        }
    }

    // console.log('rel');
    // for(let key in relatives) {
    //     console.log(key, relatives[key]);
    // }
    // console.log('abs');
    // for(let key in absolutes) {
    //     console.log(key, absolutes[key]);
    // }
    
    delete absolutes[4];

    for(let key of Object.keys(absolutes)) {
        delete relatives[key];
    }

    while(Object.keys(relatives).length) {
        let foundKeys = [];
        for(let key in relatives) {
            let relativeRoot = relatives[key];
            let found = false;
            for(let target in relativeRoot) {
                if(!found) {
                    let relative = relativeRoot[target];

                    if(absolutes[target]) {
                        let absolute = absolutes[target];
                        foundKeys.push(key);

                        let rightRotated = rotate(relative, absolute.rotation);
                        let newRotation = {
                            x: { dir: absolute.rotation[relative.rotation.x.dir].dir, mult:absolute.rotation.x.mult * relative.rotation.x.mult },
                            y: { dir: absolute.rotation[relative.rotation.y.dir].dir, mult:absolute.rotation.y.mult * relative.rotation.y.mult },
                            z: { dir: absolute.rotation[relative.rotation.z.dir].dir, mult:absolute.rotation.z.mult * relative.rotation.z.mult },
                        }
                        console.log(key, target, relative.rotation, absolute.rotation, newRotation);
                        let newAbs = {
                            x: absolute.x + rightRotated.x,
                            y: absolute.y + rightRotated.y,
                            z: absolute.z + rightRotated.z,
                            rotation: newRotation,
                        };

                        absolutes[key] = newAbs;
                        found = true;
                    }
                }
            }
        }

        for(let key of foundKeys) {
            delete relatives[key];
        }
    }

    let beacons = [];
    for(let i = 0; i < scanners.length; i++) {
        let scanner = scanners[i];
        let absolute = absolutes[i];
        for(let beacon of scanner.beacons) {
            let rotated = rotate(beacon, absolute.rotation);
            rotated.x += absolute.x;
            rotated.y += absolute.y;
            rotated.z += absolute.z;
            if(!beacons.find(b => b.x === rotated.x && b.y === rotated.y && b.z === rotated.z)) {
                rotated.from = i;
                beacons.push(rotated);
            }
        }
    }

    beacons.sort((a, b) => a.x - b.x);

    //console.log(beacons);
    console.log(beacons.length);
}).catch((err) => {
    console.log(err, err.stack);
});