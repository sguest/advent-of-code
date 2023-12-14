let lib = require('../../lib');

let year = 2023;
let day = 14;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let rocks = [];
    for(let line of lines) {
        rocks.push(line.split(''));
    }

    let deltas = [{ x: 0, y: -1}, { x: -1, y: 0}, { x: 0, y: 1}, { x: 1, y: 0 }];

    let found = {};
    let target = -1;
    let done = false;
    let cycle = 0;

    while(!done) {
        cycle++;
        for(let delta of deltas) {
            let moved = true;
            while(moved) {
                moved = false;
                if(delta.x === 0) {
                    let start = delta.y === 1 ? rocks.length - 2 : 1;
                    let end = delta.y === 1 ? -1 : rocks.length;
                    for(let y = start; y !== end; y-= delta.y) {
                        for(let x = 0; x < rocks[y].length; x++) {
                            if(rocks[y + delta.y][x] === '.' && rocks[y][x] === 'O') {
                                rocks[y + delta.y][x] = 'O';
                                rocks[y][x] = '.';
                                moved = true;
                            }
                        }
                    }
                }
                else {
                    let start = delta.x === 1 ? rocks[0].length - 2 : 1;
                    let end = delta.x === 1 ? -1 : rocks[0].length;
                    for(let x = start; x != end; x-= delta.x) {
                        for(let y = 0; y < rocks.length; y++) {
                            if(rocks[y][x + delta.x] === '.' && rocks[y][x] === 'O') {
                                rocks[y][x + delta.x] = 'O';
                                rocks[y][x] = '.';
                                moved = true;
                            }
                        }
                    }
                }
            }
        }

        if(cycle === target) {
            done = true;
        }

        let key = rocks.map(r => r.join('')).join('');
        if(found[key]) {
            let cycleLength = found[key] - cycle;
            let remainingCycles = 1000000000 - cycle;
            let remainder = remainingCycles % cycleLength;
            target = cycle + remainder;
        }
        found[key] = cycle;
    }

    let load = 0;
    let height = rocks.length;
    for(let y = 0; y < rocks.length; y++) {
        for(let x = 0; x < rocks[y].length; x++) {
            if(rocks[y][x] === 'O') {
                load += height - y;
            }
        }
    }
    console.log(load);
}).catch((err) => {
    console.log(err, err.stack);
});