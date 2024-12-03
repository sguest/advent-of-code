let lib = require('../../lib');

let year = 2021;
let day = 11;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let octopi = [];
    for(let line of lines) {
        octopi.push(line.split('').map(x => +x));
    }

    let flashes = 0;

    for(let step = 0; step < 100; step++) {
        let flashed = [];

        for(let x = 0; x < octopi.length; x++) {
            flashed[x] = [];
            for(let y = 0; y < octopi[x].length; y++) {
                octopi[x][y]++;
            }
        }

        let dirty = true;

        while(dirty) {
            dirty = false;
            for(let x = 0; x < octopi.length; x++) {
                for(let y = 0; y < octopi[x].length; y++) {
                    if(octopi[x][y] > 9 && !flashed[x][y]) {
                        flashes++;
                        flashed[x][y] = true;
                        dirty = true;
                        octopi[x][y] = 0;
                        for(let xx = x - 1; xx <= x + 1; xx++) {
                            for(let yy = y - 1; yy <= y + 1; yy++) {
                                if((xx !== x || yy !== y) && octopi[xx] && octopi[xx][yy] !== undefined && !flashed[xx][yy]) {
                                    octopi[xx][yy]++;
                                }
                            }
                        }
                    }
                }
            }
        }

    }

    console.log(flashes);
}).catch((err) => {
    console.log(err, err.stack);
});