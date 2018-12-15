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

    let highestNum = 0;
    let highestX = 0;
    let highestY = 0;

    for(let x = 1; x <= 298; x++) {
        for(let y = 1; y <= 290;  y++) {
            let power = 0;

            for(let xx = x; xx < x + 3; xx++) {
                for(let yy = y; yy < y + 3; yy++) {
                    power += grid[xx][yy];
                }
            }

            if(power > highestNum) {
                highestNum = power;
                highestX = x;
                highestY = y;
            }
        }
    }

    console.log(highestX + ',' + highestY);
}).catch((err) => {
    console.log(err.stack);
});