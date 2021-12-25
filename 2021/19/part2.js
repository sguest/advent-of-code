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

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let scanners = [];
    let currentScanner;
    let id = 0;
    for(let line of lines) {
        if(line) {
            if(line[1] === '-') {
                if(currentScanner) {
                    scanners.push(currentScanner);
                }
                currentScanner = { x:0, y: 0, z: 0, beacons: [], diffs: [], smallDiffs: [], absoluteBeacons: [], rotation: rotations[0], id };
                id++;
            }
            else {
                let coords = line.split(',').map(x => +x);
                currentScanner.beacons.push({ x: coords[0], y: coords[1], z: coords[2] });
            }
        }
    }
    scanners.push(currentScanner);

    for(let scanner of scanners) {
        for(let i = 0; i < scanner.beacons.length; i++) {
            for(let j = 0; j < scanner.beacons.length; j++) {
                if(i !== j) {
                    let diff =  {
                        id1: i,
                        id2: j,
                        x: scanner.beacons[i].x - scanner.beacons[j].x,
                        y: scanner.beacons[i].y - scanner.beacons[j].y,
                        z: scanner.beacons[i].z - scanner.beacons[j].z,
                    }

                    scanner.diffs.push(diff);

                    if(i >= 11) {
                        scanner.smallDiffs.push(diff)
                    }
                }
            }
        }
    }

    scanners[0].absoluteBeacons = scanners[0].beacons;
    let foundScanners = [scanners.shift()];
    let queue = new lib.linkedList();
    queue.push(foundScanners[0]);

    while(queue.any()) {
        let left = queue.shift();
        let newScanners = [];
        for(let right of scanners) {
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
                    let leftRotated = rotate(leftBeacon, left.rotation);

                    for(let rotation2 of rotations) {
                        let rightRotated = rotate(rightBeacon, rotation2);
                        let rotatedScanner = {
                            x: leftRotated.x - rightRotated.x + left.x,
                            y: leftRotated.y - rightRotated.y + left.y,
                            z: leftRotated.z - rightRotated.z + left.z,
                        }
                        let shiftedBeacons = [];
                        let matches = 0;
                        for(let beacon of right.beacons) {
                            let rotated = rotate(beacon, rotation2);
                            rotated.x += rotatedScanner.x;
                            rotated.y += rotatedScanner.y;
                            rotated.z += rotatedScanner.z;
                            shiftedBeacons.push(rotated);

                            for(let leftBeacon of left.absoluteBeacons) {
                                if(rotated.x === leftBeacon.x && rotated.y === leftBeacon.y && rotated.z === leftBeacon.z) {
                                    matches++;
                                }
                            }
                        }

                        if(matches >= 12) {
                            right.x = rotatedScanner.x;
                            right.y = rotatedScanner.y;
                            right.z = rotatedScanner.z;
                            right.rotation = rotation2;
                            right.absoluteBeacons = shiftedBeacons;
                            newScanners.push(right);
                            foundScanners.push(right);
                            queue.push(right);
                            break;
                        }
                    }
                }
            }
        }

        for(let newScanner of newScanners) {
            scanners.splice(scanners.indexOf(newScanner), 1);
        }
    }

    let maxDistance = 0;

    for(let i = 0; i < foundScanners.length - 1; i++) {
        let scanner1 = foundScanners[i];
        for(let j = i + 1; j < foundScanners.length; j++) {
            let scanner2 = foundScanners[j];
            let distance = Math.abs(scanner1.x - scanner2.x) + Math.abs(scanner1.y - scanner2.y) + Math.abs(scanner1.z - scanner2.z);
            maxDistance = Math.max(maxDistance, distance);
        }
    }

    console.log(maxDistance);
}).catch((err) => {
    console.log(err, err.stack);
});