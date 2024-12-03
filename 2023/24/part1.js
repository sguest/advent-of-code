let lib = require('../../lib');

let year = 2023;
let day = 24;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let hailstones = [];
    for(let line of lines) {
        let [position, velocity] = line.split(' @ ');
        let [px, py, pz] = position.split(', ').map(Number);
        let [vx, vy, vz] = velocity.split(', ').map(Number);
        let a = vy;
        let b = -vx;
        let c = a * px + b * py;
        hailstones.push({ a, b, c, px, py, pz, vx, vy, vz });
    }

    let minValue = 200000000000000;
    let maxValue = 400000000000000;

    let collisions = 0;
    for(let i = 0; i < hailstones.length; i++) {
        let stone1 = hailstones[i];

        //console.log('***** stone1', stone1);

        for(let j = i + 1; j < hailstones.length; j++) {
            let stone2 = hailstones[j];
            //console.log('stone2', stone2);
            let det = stone1.a * stone2.b - stone2.a * stone1.b;
            if(det !== 0) {
                let x = (stone2.b * stone1.c - stone1.b * stone2.c) / det;
                let y = (stone1.a * stone2.c - stone2.a * stone1.c) / det;
                //console.log('collision', x, y);

                if(x >= minValue && x <= maxValue && y >= minValue && y <= maxValue) {
                    let valid = true;
                    if(x < stone1.px && stone1.vx > 0) {
                        valid = false;
                    }
                    if(x > stone1.px && stone1.vx < 0) {
                        valid = false;
                    }
                    if(x < stone2.px && stone2.vx > 0) {
                        valid = false;
                    }
                    if(x > stone2.px && stone2.vx < 0) {
                        valid = false;
                    }
                    if(valid) {
                        //console.log('valid');
                        collisions++;
                    }
                    else {
                        //console.log('past');
                    }
                }
                else {
                    //console.log('outside');
                }
            }
            else {
                //console.log('parallel');
            }
        }
    }
    console.log(collisions);
}).catch((err) => {
    console.log(err, err.stack);
});