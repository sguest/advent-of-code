let lib = require('../../lib');

let year = 2018;
let day = 11;

function getCell(grid, x, y) {
    if(!grid[x]) {
        return 0;
    }

    return grid[x][y] || 0;
}

lib.getInput(year, day).then((data) => {
    let serial = +data;
    let sumGrid = [];

    for(let i = 0; i <= 300; i++) {
        sumGrid.push([]);
    }

    for(let x = 1; x <= 300; x++) {
        for(let y = 1; y <= 300; y++) {
            let rackId = x + 10;
            let power = rackId * y;
            power += serial;
            power *= rackId;
            power = Math.floor(power % 1000 / 100);
            power -= 5;
            sumGrid[x][y] = power + getCell(sumGrid, x - 1, y) + getCell(sumGrid, x, y - 1) - getCell(sumGrid, x - 1, y - 1);
        }
    }

    let highestNum = 0;
    let highestX = 0;
    let highestY = 0;
    let highestSize = 0;

    for(let x = 1; x < 300; x++) {
        for(let y = 1; y < 300; y++) {
            for(let size = 1; size < (300 - x); size++) {
                let x2 = x + size - 1;
                let y2 = y + size - 1;

                let power = sumGrid[x - 1][y - 1] + sumGrid[x2][y2] - sumGrid[x - 1][y2] - sumGrid[x2][y - 1];
                if(power > highestNum) {
                    highestNum = power;
                    highestX = x;
                    highestY = y;
                    highestSize = size;
                }    
            }
        }
    }

    console.log(highestX + ',' + highestY + ',' + highestSize);
}).catch((err) => {
    console.log(err.stack);
});