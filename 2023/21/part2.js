let lib = require('../../lib');

let year = 2023;
let day = 21;

/*
    Theory heavily based on this explanation https://github.com/villuna/aoc23/wiki/A-Geometric-solution-to-advent-of-code-2023,-day-21
    However, that one seems to count on a "luckier" input than I have. Namely, it seems to assume
    That all corner and edge cases are equal in number of plots. That does not seem to be the case with my input
*/
lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let startX, startY;
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            if(lines[y][x] === 'S') {
                startX = x;
                startY = y;
            }
        }
    }

    let deltas = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
    ];

    let targetSteps = 26501365;

    let gridWidth = lines[0].length;

    let solve = (startX, startY, maxSteps, parity) => {
        let queue = new lib.linkedList();
        queue.push({ x: startX, y: startY, steps: 0 });

        let visited = {};
        let count = 0;
        while(queue.length) {
            let current = queue.shift();
            let key = `${current.x},${current.y}`;

            if(!visited[key]) {
                visited[key] = true;

                if(current.steps % 2 === parity) {
                    count++;
                }
                if(current.steps < maxSteps) {
                    for(let delta of deltas) {
                        let targetX = current.x + delta.x;
                        let targetY = current.y + delta.y;
                        
                        if(targetX >= 0 && targetY >= 0 && targetX < lines[0].length && targetY < lines.length && lines[targetY][targetX] !== '#')  {
                            queue.push({ x: targetX, y: targetY, steps: current.steps + 1 });
                        }
                    }
                }
            }
        }
        return count
    }

    let gridRadius = (targetSteps - startX) / gridWidth;

    let countOddFull = solve(startX, startY, gridWidth * 2, 1);
    let countEvenFull = solve(startX, startY, gridWidth * 2, 0);

    let countRightTip = solve(0, startY, gridWidth, 0);
    let countLeftTip = solve(gridWidth - 1, startY, gridWidth, 0);
    let countTopTip = solve(startX, gridWidth - 1, gridWidth, 0);
    let countBottomTip = solve(startX, 0, gridWidth, 0);

    let countOddBR = solve(0, 0, gridWidth + startX, 1);
    let countOddBL = solve(gridWidth - 1, 0, gridWidth + startX, 1);
    let countOddTR = solve(0, gridWidth - 1, gridWidth + startX, 1);
    let countOddTL = solve(gridWidth - 1, gridWidth - 1, gridWidth + startX, 1);

    let countEvenBR = solve(0, 0, startX, 0);
    let countEvenBL = solve(0, gridWidth - 1, startX, 0);
    let countEvenTR = solve(gridWidth - 1, 0, startX, 0);
    let countEvenTL = solve(gridWidth - 1, gridWidth - 1, startX, 0);

    let numOddFullGrids = ((gridRadius - 1) ** 2);
    let numEvenFullGrids = gridRadius ** 2;
    let numOddCorners = gridRadius - 1;
    let numEvenCorners = gridRadius;

    console.log(
        countOddFull * numOddFullGrids +
        countEvenFull * numEvenFullGrids +
        countTopTip +
        countBottomTip +
        countLeftTip +
        countRightTip +
        countOddBR * numOddCorners +
        countOddBL * numOddCorners +
        countOddTR * numOddCorners +
        countOddTL * numOddCorners +
        countEvenBR * numEvenCorners +
        countEvenBL * numEvenCorners +
        countEvenTR * numEvenCorners +
        countEvenTL * numEvenCorners);
}).catch((err) => {
    console.log(err, err.stack);
});