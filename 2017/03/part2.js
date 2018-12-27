const lib = require('../../lib');

lib.getInput(2017, 3).then((data) => {
    let input = +data;

    let x = 0;
    let y = 0;

    let maxX = 0;
    let maxY = 0;
    let minX = 0;
    let minY = 0;

    let direction = 'R';

    let grid = [];
    grid[0] = [];
    grid[0][0] = 1;

    function getValue(x, y) {
        if(grid[x]) {
            return grid[x][y] || 0;
        }

        return 0;
    }

    while(true) {
        if(direction === 'R') {
            x += 1;
            if(x > maxX) {
                maxX = x;
                direction = 'U';
            }
        }
        else if(direction === 'L') {
            x -= 1;
            if(x < minX) {
                minX = x;
                direction = 'D';
            }
        }
        else if(direction === 'U')
        {
            y -= 1;
            if(y < minY) {
                minY = y;
                direction = 'L';
            }
        }
        else if(direction === 'D') {
            y += 1;
            if(y > maxY) {
                maxY = y;
                direction = 'R';
            }
        }

        var currentValue = 0;
        for(let xN = x - 1; xN <= x + 1; xN++) {
            for(let yN = y - 1; yN <= y + 1; yN++) {
                currentValue += getValue(xN, yN);
            }
        }

        if(currentValue > input) {
            console.log(currentValue);
            break;
        }

        grid[x] = grid[x] || [];
        grid[x][y] = currentValue;
    }
});