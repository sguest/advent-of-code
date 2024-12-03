let lib = require('../../lib');

let year = 2015;
let day = 18;

let grid = [];

function get(x, y) {
    return !!grid[x] && !!grid[x][y];
}

lib.getInput(year, day).then((data) => {

    for(let line of data.split('\n')) {
        grid.push(line.split('').map(x => x === '#'));
    }
    
    grid[0][0] = true;
    grid[99][0] = true;
    grid[0][99] = true;
    grid[99][99] = true;

    for(let step = 0; step < 100; step++) {
        let newGrid = [];
        for(let x = 0; x < grid.length; x++) {
            let newLine = [];
            for(let y = 0; y < grid[x].length; y++) {
                let count = 0;
                for(let xn = x - 1; xn <= x + 1; xn++) {
                    for(let yn = y - 1; yn <= y + 1; yn++) {
                        if(xn !== x || yn !== y) {
                            count += get(xn, yn) ? 1 : 0;
                        }
                    }
                }

                newLine.push(count === 3 || (count === 2 && get(x, y)));
            }
            newGrid.push(newLine);
        }
        grid = newGrid;
        grid[0][0] = true;
        grid[99][0] = true;
        grid[0][99] = true;
        grid[99][99] = true;
    }

    let count = 0;
    for(let line of grid) {
        for(let position of line) {
            count += position ? 1 : 0;
        }
    }
    console.log(count);
});