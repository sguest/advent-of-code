let lib = require('../../lib');

let year = 2023;
let day = 13;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    lines.push('');
    let sum = 0;
    let pattern = [];
    for(let line of lines) {
        if(!line) {
            for(let xReflect = 0; xReflect < pattern[0].length - 1; xReflect++) {
                let misses = 0;
                for(let x = 0; x <= xReflect; x++) {
                    let targetX = 2 * xReflect - x + 1;
                    if(misses < 2 && targetX < pattern[0].length) {
                        for(let y = 0; y < pattern.length; y++) {
                            if(pattern[y][x] !== pattern[y][targetX]) {
                                misses++;
                            }
                        }
                    }
                }
                if(misses === 1) {
                    sum += xReflect + 1;
                }
            }
            for(let yReflect = 0; yReflect < pattern.length - 1; yReflect++) {
                let misses = 0;
                for(let y = 0; y <= yReflect; y++) {
                    let targetY = 2 * yReflect - y + 1;
                    if(misses < 2 && targetY < pattern.length) {
                        for(let x = 0; x < pattern[0].length; x++) {
                            if(pattern[y][x] !== pattern[targetY][x]) {
                                misses++;
                            }
                        }
                    }
                }
                if(misses === 1) {
                    sum += (yReflect + 1) * 100;
                }
            }
            pattern = [];
        }
        else {
            pattern.push(line);
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});