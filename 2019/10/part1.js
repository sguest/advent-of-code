let lib = require('../../lib');

let year = 2019;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let width = lines[0].length;
    let height = lines.length;
    let grid = [];
    
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            grid[x] = grid[x] || [];
            grid[x][y] = lines[y][x] === '#';
        }
    }

    let max = 0;
    for(let astX = 0; astX < width; astX++) {
        for(let astY = 0; astY < height; astY++) {
            if(grid[astX][astY]) {
                let current = 0;
                let targetGrid = [];

                for(let xOffset = -1; xOffset <= 1; xOffset +=2) {
                    for(let yOffset = -1; yOffset <= 1; yOffset += 2) {
                        for(let targetX = astX; targetX < width && targetX >= 0; targetX += xOffset) {
                            targetGrid[targetX] = targetGrid[targetX] || [];
                            for(let targetY = astY; targetY < height && targetY >= 0; targetY += yOffset) {
                                if(!targetGrid[targetX][targetY] && (astX !== targetX || astY !== targetY)) {
                                    let found = false;
                                    let deltaX = targetX - astX;
                                    let deltaY = targetY - astY;
                                    let currentX = targetX;
                                    let currentY = targetY;
        
                                    while(currentX < width && currentX >= 0 && currentY < height && currentY >= 0) {
                                        if(!found && grid[currentX][currentY]) {
                                            found = true;
                                            current++;
                                        }
                                        targetGrid[currentX] = targetGrid[currentX] || [];
                                        targetGrid[currentX][currentY] = true;
                                        currentX += deltaX;
                                        currentY += deltaY;
                                    }
                                }
                            }
                        }
                    }
                }
                max = Math.max(current, max);
            }
        }
    }

    console.log(max);
}).catch((err) => {
    console.log(err, err.stack);
});