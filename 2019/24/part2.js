let lib = require('../../lib');

let year = 2019;
let day = 24;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            grid[x] = grid[x] || [];
            grid[x][y] = (line[x] === '#');
        }
    }

    let levels = [grid];
    let minLevel = 0;
    let maxLevel = 0;

    let elapsed = 0;

    while(elapsed < 200) {
        elapsed++;
        let newLevels = [];

        let maxGrid = levels[maxLevel];
        let newMax = false;
        for(let x = 0; x < 5; x++) {
            for(let y of [0, 4]) {
                if(maxGrid[x][y]) {
                    newMax = true;
                }
            }
        }
        for(let y = 0; y < 5; y++) {
            for(let x of [0, 4]) {
                if(maxGrid[x][y]) {
                    newMax = true;
                }
            }
        }
        if(newMax) {
            maxLevel++;
            let newGrid = [];
            for(let x = 0; x < 5; x++) {
                newGrid[x] = [];
            }
            levels[maxLevel] = newGrid;
        }

        let minGrid = levels[minLevel];
        let newMin = false;
        for(let x = 1; x < 4; x++) {
            for(let y = 1; y < 4; y++) {
                if(minGrid[x][y]) {
                    newMin = true;
                }
            }
        }
        if(newMin) {
            minLevel--;
            let newGrid = [];
            for(let x = 0; x < 5; x++) {
                newGrid[x] = [];
            }
            levels[minLevel] = newGrid;
        }

        for(let level = minLevel; level <= maxLevel; level++) {
            let currentLevel = levels[level];
            let prevLevel = levels[level - 1] || [];
            let nextLevel = levels[level + 1] || [];

            let newGrid = [];

            for(let x = 0; x < 5; x++) {
                newGrid[x] = [];
                for(let y = 0; y < 5; y++) {
                    let count = 0;

                    if(x === 0) {
                        if(nextLevel[1] && nextLevel[1][2]) {
                            count++;
                        }
                    }
                    else if(x === 3 && y === 2) {
                        if(prevLevel[4]) {
                            for(let prevY = 0; prevY < 5; prevY++) {
                                if(prevLevel[4][prevY]) {
                                    count++;
                                }
                            }
                        }
                    }
                    else {
                        if(currentLevel[x-1][y]) {
                            count++;
                        }
                    }

                    if(x === 4) {
                        if(nextLevel[3] && nextLevel[3][2]) {
                            count++;
                        }
                    }
                    else if(x === 1 && y === 2) {
                        if(prevLevel[0]) {
                            for(let prevY = 0; prevY < 5; prevY++) {
                                if(prevLevel[0][prevY]) {
                                    count++;
                                }
                            }
                        }
                    }
                    else {
                        if(currentLevel[x + 1][y]) {
                            count++;
                        }
                    }

                    if(y === 0) {
                        if(nextLevel[2] && nextLevel[2][1]) {
                            count++;
                        }
                    }
                    else if(y === 3 && x === 2) {
                        for(let prevX = 0; prevX < 5; prevX++) {
                            if(prevLevel[prevX]) {
                                if(prevLevel[prevX][4]) {
                                    count++;
                                }
                            }
                        }
                    }
                    else {
                        if(currentLevel[x][y-1]) {
                            count++;
                        }
                    }

                    if(y === 4) {
                        if(nextLevel[2] && nextLevel[2][3]) {
                            count++;
                        }
                    }
                    else if(y === 1 && x === 2) {
                        for(let prevX = 0; prevX < 5; prevX++) {
                            if(prevLevel[prevX]) {
                                if(prevLevel[prevX][0]) {
                                    count++;
                                }
                            }
                        }
                    }
                    else {
                        if(currentLevel[x][y + 1]) {
                            count++;
                        }
                    }

                    if(count === 1){ 
                        newGrid[x][y] = true;
                    }
                    else if(count === 2 && !currentLevel[x][y]) {
                        newGrid[x][y] = true;
                    }
                    else {
                        newGrid[x][y] = false;
                    }
                }
            }

            newLevels[level] = newGrid;
        }

        levels = newLevels;
    }

    let count = 0;
    for(let level = minLevel; level <= maxLevel; level++) {
        for(let x = 0; x < 5; x++) {
            for(let y = 0; y < 5; y++) {
                if(levels[level][x][y] && (x !== 2 || y !== 2)) {
                    count++;
                }
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});