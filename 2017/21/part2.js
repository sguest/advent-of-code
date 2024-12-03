let lib = require('../../lib');

let year = 2017;
let day = 21;

let sub2 = [];
let sub3 = [];

function invertGrid(grid) {
    let size = grid.length;
    let newGrid = [];

    for(let x = 0; x < size; x++) {
        newGrid[x] = [];
        for(let y = 0; y < size; y++) {
            newGrid[x][y] = grid[size - y - 1][size - x - 1];
        }
    }

    return newGrid;
}

function flipGrid(grid) {
    return grid.slice().reverse();
}

lib.getInput(year, day).then((data) => {
    let subs = {};
    for(let line of data.split('\n')) {
        let parts = line.split(' => ');
        let inputParts = parts[0].split('/');
        let input = [];
        for(let inputLine of inputParts) {
            let arr = inputLine.split('');
            input.push(arr.map(x => x === '#'));
        }

        let output = [];
        let outputParts = parts[1].split('/');
        for(let outputLine of outputParts) {
            let arr = outputLine.split('');
            output.push(arr.map(x => x === '#'));
        }

        subs[input] = output;
        input = invertGrid(input);
        subs[input] = output;
        input = flipGrid(input);
        subs[input] = output;
        input = invertGrid(input);
        subs[input] = output;
        input = flipGrid(input);
        subs[input] = output;
        input = invertGrid(input);
        subs[input] = output;
        input = flipGrid(input);
        subs[input] = output;
        input = invertGrid(input);
        subs[input] = output;
    }

    let grid = [[false, true, false], [false, false, true], [true, true, true]];

    for(let it = 0; it < 18; it++) {
        let chunkSize = (grid.length % 2 === 0 ? 2 : 3);
        let newGrid = [];

        for(let x = 0; x < grid.length; x += chunkSize) {
            let newLines = [];
            for(let i = 0; i < chunkSize + 1; i++) {
                newLines.push([]);
            }
            for(let y = 0; y < grid.length; y += chunkSize) {
                let partGrid = [];
                for(let x1 = 0; x1 < chunkSize; x1++) {
                    partGrid[x1] = [];
                    for(let y1 = 0; y1 < chunkSize; y1++) {
                        partGrid[x1][y1] = grid[x + x1][y + y1];
                    }
                }
                let match = subs[partGrid];

                for(let matchX = 0; matchX < match.length; matchX++) {
                    for(let matchItem of match[matchX]) {
                        newLines[matchX].push(matchItem);
                    }
                }
            }
            newGrid.push(...newLines);
        }

        grid = newGrid;
    }

    let count = grid.reduce((prev, line) => prev + line.reduce((prev1, val) => prev1 + val, 0), 0);

    console.log(count);
}).catch((err) => {
    console.log(err.stack);
});