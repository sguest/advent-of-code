let lib = require('../../lib');

let year = 2019;
let day = 12;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let moons = [];

    for(let line of lines) {
        let parsed = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/.exec(line);
        moons.push({
            position: [+parsed[1], +parsed[2], +parsed[3]],
            velocity: [0,0,0],
        });
    }

    for(let step = 0; step < 1000; step++) {
        for(let moon of moons) {
            for(let other of moons) {
                if(moon !== other) {
                    for(let index = 0; index < 3; index++) {
                        if(other.position[index] < moon.position[index]) {
                            moon.velocity[index]--;
                        }
                        else if(other.position[index] > moon.position[index]) {
                            moon.velocity[index]++;
                        }
                    }
                }
            }
        }

        for(let moon of moons) {
            for(let index = 0; index < 3; index++) {
                moon.position[index] += moon.velocity[index];
            }
        }

    }

    let energy = moons.reduce((total, moon) => total + moon.position.reduce((tot, value) => tot + Math.abs(value), 0) * moon.velocity.reduce((tot, value) => tot + Math.abs(value), 0), 0)
    console.log(energy);
}).catch((err) => {
    console.log(err, err.stack);
});