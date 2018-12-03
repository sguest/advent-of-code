let lib = require('../../lib');

let year = 2018;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let parser = /\#\d+ @ (\d+),(\d+)\: (\d+)x(\d+)/;
    let claimed = [];
    let overlaps = [];
    let overlapCount = 0;

    for(let i = 0; i <= 1000; i++) {
        claimed[i] = [];
        overlaps[i] = [];
    }

    for(let line of lines) {
        let parsed = parser.exec(line);
        let left = +parsed[1];
        let top = +parsed[2];
        let width = +parsed[3];
        let height = +parsed[4];

        for(let x = left; x < left + width; x++) {
            for(let y = top; y < top + height; y++) {
                if(claimed[x][y]) {
                    if(!overlaps[x][y]) {
                        overlaps[x][y] = true;
                        overlapCount++;
                    }
                }
                else {
                    claimed[x][y] = true;
                }
            }
        }
    }

    console.log(overlapCount);
}).catch((err) => {
    console.log(err.stack);
});
