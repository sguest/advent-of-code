let lib = require('../../lib');

let year = 2019;
let day = 12;

function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let moons = [];
    let initial = [];
    let loopsFound = [];

    for(let line of lines) {
        let parsed = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/.exec(line);
        moons.push({
            position: [+parsed[1], +parsed[2], +parsed[3]],
            velocity: [0,0,0],
        });
        initial.push({
            position: [+parsed[1], +parsed[2], +parsed[3]],
        });
    }

    let loopCounts = [];
    let numLoopsFound = 0;
    let step = 1;

    while(numLoopsFound < 3) {
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

        for(let index = 0; index < 3; index++) {
            if(!loopsFound[index])
            {
                let found = true;
                for(let moon of moons) {
                    if(moon.velocity[index] !== 0) {
                        found = false;
                    }
                }

                if(found) {
                    numLoopsFound++;
                    loopCounts.push(step);
                    loopsFound[index] = true;
                }
            }
        }
        step++;
    }

    console.log(loopCounts.reduce((total, current) => lcm(total, current)) * 2);
}).catch((err) => {
    console.log(err, err.stack);
});