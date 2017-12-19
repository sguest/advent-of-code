let fs = require('fs');
let path = require('path');

let year = 2017;
let day = 19;

fs.readFile(path.resolve(__dirname, 'input.txt'), 'utf-8', (err, data) => {
    let grid = [];
    let lines = data.split('\n');

    function canMove(x, y) {
        return !(x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] === ' ');
    }

    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            grid[x] = grid[x] || [];
            grid[x][y] = line[x];
        }
    }

    let currentY = -1;
    for(let x = 0; x < grid.length; x++) {
        if(grid[x][0] === '|') {
            currentX = x;
            break;
        }
    }

    let direction = 'D';
    let steps = 0;

    while(true) {
        let nextX = currentX;
        let nextY = currentY;

        if(direction === 'D') {
            nextY++;
        }
        else if(direction === 'U') {
            nextY--;
        }
        else if(direction === 'R') {
            nextX++;
        }
        else if(direction === 'L') {
            nextX--;
        }

        if(canMove(nextX, nextY)) {
            currentX = nextX;
            currentY = nextY;
        }
        else {
            if(direction === 'D') {
                if(canMove(currentX - 1, currentY)) {
                    currentX--;
                    direction = 'L';
                }
                else if(canMove(currentX + 1, currentY)) {
                    currentX++;
                    direction = 'R';
                }
                else {
                    break;
                }
            }
            else if(direction === 'U') {
                if(canMove(currentX - 1, currentY)) {
                    currentX--;
                    direction = 'L';
                }
                else if(canMove(currentX + 1, currentY)) {
                    currentX++;
                    direction = 'R';
                }
                else {
                    break;
                }
            }
            else if(direction === 'L') {
                if(canMove(currentX, currentY - 1)) {
                    currentY--;
                    direction = 'U';
                }
                else if(canMove(currentX, currentY + 1)) {
                    currentY++;
                    direction = 'D';
                }
                else {
                    break;
                }
            }
            else if(direction === 'R') {
                if(canMove(currentX, currentY - 1)) {
                    currentY--;
                    direction = 'U';
                }
                else if(canMove(currentX, currentY + 1)) {
                    currentY++;
                    direction = 'D';
                }
                else {
                    break;
                }
            }
        }
        steps++;            
    }

    console.log(steps);
}); 