let lib = require('../../lib');

let year = 2019;
let day = 10;

function getTargets(astX, astY, grid) {
    let targetGrid = [];
    let targets = [];
    let width = grid.length;
    let height = grid[0].length;

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
                                targets.push({x: currentX, y: currentY});
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

    return targets;
}

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
    let targets = [];
    for(let astX = 0; astX < width; astX++) {
        for(let astY = 0; astY < height; astY++) {
            if(grid[astX][astY]) {
                let currentTargets = getTargets(astX, astY, grid);

                if(currentTargets.length > targets.length) {
                    targets = currentTargets;
                    laser = {x: astX, y: astY};
                }
            }
        }
    }

    let shots = 0;

    let quadrants = [
        {
            minX: laser.x,
            maxX: width,
            minY: 0,
            maxY: laser.y,
        },
        {
            minX: laser.x,
            maxX: width,
            minY: laser.y,
            maxY: height,
        },
        {
            minX: 0,
            maxX: laser.x,
            minY: laser.y,
            maxY: height,
        },
        {
            minX: 0,
            maxX: laser.x,
            minY: 0,
            maxY: laser.y,
        }
    ]

    while(shots < 200) {
        for(let quadrant of quadrants) {
            let quadrantTargets = [];

            for(let target of targets) {
                if(target.x >= quadrant.minX && target.x < quadrant.maxX && target.y >= quadrant.minY && target.y < quadrant.maxY) {
                    quadrantTargets.push(target);
                }
            }

            while(quadrantTargets.length) {
                let currentIndex;
                let currentSlope;
                let currentTarget;

                for(let index = 0; index < quadrantTargets.length; index++) {
                    let target = quadrantTargets[index];
                    let slope = (laser.y - target.y) / (target.x - laser.x);
                    if(currentSlope === undefined || slope > currentSlope) {
                        currentIndex = index;
                        currentSlope = slope;
                        currentTarget = target;
                    }
                }

                shots++;
                if(shots === 200) {
                    console.log(currentTarget.x * 100 + currentTarget.y);
                }
                else {
                    quadrantTargets.splice(currentIndex, 1);
                    grid[currentTarget.x][currentTarget.y] = false;
                }
            }

        }

        targets = getTargets(laser.x, laser.y, grid);
    }
}).catch((err) => {
    console.log(err, err.stack);
});