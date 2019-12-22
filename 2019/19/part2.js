let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 19;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let y = 1;
    let minX = 0;
    let maxX = 0;
    let maxes = [];

    while(true) {
        let found = false;
        while(!found && minX <= y * 5) {
            let program = intcodes.compile(codes.slice(0));
            let output = program.run(minX, y);
            if(output.value === 1) {
                found = true;
            }
            else {
                minX++;
            }
        }
        
        if(found) {
            if(maxX === 0) {
                maxX = minX;
            }

            found = false;

            while(!found) {
                maxX++;
                let program = intcodes.compile(codes.slice(0));
                let output = program.run(maxX, y);
                if(output.value === 0) {
                    found = true;
                    maxX--;
                    maxes[y] = maxX;
                }
            }

            if(y >= 100) {
                if(maxes[y - 99] >= minX + 99) {
                    console.log(minX * 10000 + y - 99);
                    process.exit(0);
                }
            }
        }
        else {
            minX = 0;
            maxes[y] = 0;
        }

        y++;
    }
}).catch((err) => {
    console.log(err, err.stack);
});