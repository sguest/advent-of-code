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

    const max = 4000000;

    for(let sensor of sensors) {
        for(let x = sensor.x - sensor.range - 1; x <= sensor.x + sensor.range + 1; x++) {
            if(x >= 0 && x <= max) {
                let yDistance = sensor.range - Math.abs(sensor.x - x) + 1;
                for(let y of [sensor.y - yDistance, sensor.y + yDistance]) {
                    if(y >= 0 & y <= max) {
                        let found = false;
                        for(let sensor2 of sensors) {
                            let distance = Math.abs(sensor2.x - x) + Math.abs(sensor2.y - y);
                            if(distance <= sensor2.range) {
                                found = true;
                            }
                        }

                        if(!found) {
                            console.log(x * 4000000 + y);
                            process.exit(0);
                        }
                    }
                }
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});