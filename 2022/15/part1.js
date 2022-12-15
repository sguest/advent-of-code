let lib = require('../../lib');

let year = 2022;
let day = 15;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sensors = [];
    for(let line of lines) {
        let parsed = /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/.exec(line);
        let sensor = {
            x: +parsed[1],
            y: +parsed[2],
            beaconX: +parsed[3],
            beaconY: +parsed[4],
        };

        sensor.range = Math.abs(sensor.x - sensor.beaconX) + Math.abs(sensor.y - sensor.beaconY);

        sensors.push(sensor);
    }

    const targetY = 2000000;
    let found = {};
    for(let sensor of sensors) {
        if(sensor.beaconY === targetY) {
            found[sensor.beaconX] = true;
        }
    }
    let count = 0;

    for(let sensor of sensors) {
        let distance = Math.abs(sensor.y - targetY);
        if(distance <= sensor.range) {
            let delta = sensor.range - distance;
            for(let x = sensor.x - delta; x <= sensor.x + delta; x++) {
                if(!found[x]) {
                    found[x] = true;
                    count++;
                }
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});