let lib = require('../../lib');

let year = 2018;
let day = 11;

lib.getInput(year, day).then((data) => {
    let serial = +data;
    let grid = [];

    for(let i = 0; i <= 300; i++) {
        grid.push([]);
    }

    for(let x = 1; x <= 300; x++) {
        for(let y = 1; y <= 300; y++) {
            let rackId = x + 10;
            let power = rackId * y;
            power += serial;
            power *= rackId;
            power = Math.floor(power % 1000 / 100);
            power -= 5;
            grid[x][y] = power;
        }
    }

    console.log(grid);

    let highestNum = 0;
    let highestX = 0;
    let highestY = 0;
    let highestSize = 0;

    for(let x = 300; x > 0; x--) {
        for(let y = 300; y > 0; y--) {
            for(let size = 1; size < (300 - x); size++) {
                let power = 0;

                for(let xx = x; xx < x + size; xx++) {
                    for(let yy = y; yy < y + size; yy++) {
                        power += grid[xx][yy];
                    }
                }
    
                if(power > highestNum) {
                    highestNum = power;
                    highestX = x;
                    highestY = y;
                    highestSize = size;
                    console.log(highestNum);
                    console.log(highestX + ',' + highestY + ',' + size);
                }    
            }
        }
    }

    console.log(done);
    console.log(highestX + ',' + highestY + ',' + highestSize);
}).catch((err) => {
    console.log(err.stack);
});