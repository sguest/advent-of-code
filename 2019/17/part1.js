let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 17;

lib.getInput(year, day).then((data) => {
    let program = intcodes.compile(intcodes.parse(data));

    let output = program.run();
    let grid = [];
    let x = 0;
    let y = 0;

    while(output.signal !== 'end') {
        if(output.value === 10) {
            x = 0;
            y++;
        }
        else {
            grid[x] = grid[x] || [];
            grid[x][y] = (output.value === 35);
            x++;
        }
        output = program.run();
    }

    let total = 0;

    for(let x = 1; x < grid.length-1; x++) {
        for(let y = 1; y < grid[x].length; y++) {
            if(grid[x][y] && grid[x-1][y] && grid[x+1][y] && grid[x][y-1] && grid[x][y+1]) {
                total += x * y;
            }
        }
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});