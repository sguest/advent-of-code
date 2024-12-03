let lib = require('../../lib');

lib.getInput(2016, 8).then((data) => {
    let rectParse = /^rect (\d+)x(\d+)$/;
    let rotateParse = /^rotate (row|column) (?:x|y)=(\d+) by (\d+)$/;
    let grid = [];

    for(let x = 0; x < 50; x++) {
        grid[x] = [];
    }

    for(let line of data.split('\n')) {
        let parsed = rectParse.exec(line);
        if(parsed) {
            let width = parseInt(parsed[1], 10);
            let height = parseInt(parsed[2], 10);

            for(let x = 0; x < width; x++) {
                for(let y = 0; y < height; y++) {
                    grid[x][y] = true;
                }
            }
            continue;
        }

        parsed = rotateParse.exec(line);
        let index = parseInt(parsed[2], 10);
        let amount = parseInt(parsed[3], 10);
        if(parsed[1] === 'row') {
            let newRow = [];
            for(let x = 0; x < 50; x++) {
                newRow[(x + amount) % 50] = grid[x][index];
            }
            for(let x = 0; x < 50; x++) {
                grid[x][index] = newRow[x];
            }
        }
        else {
            let newColumn = [];
            for(let y = 0; y < 6; y++) {
                newColumn[(y + amount) % 6] = grid[index][y];
            }
            grid[index] = newColumn;
        }
    }

    let count = 0;

    for(let x = 0; x < 50; x++) {
        for(let y = 0; y < 6; y++) {
            if(grid[x][y]) {
                count ++;
            }
        }
    }

    console.log(count);
});