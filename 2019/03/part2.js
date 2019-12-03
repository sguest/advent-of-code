let lib = require('../../lib');

let year = 2019;
let day = 3;

function parseLine(line) {
    let spots = [];
    let items = [];
    let currentX = 0;
    let currentY = 0;
    let steps = 0;

    for(let current of line.split(',')) {
        let direction = current[0];
        let distance = +current.substring(1);
        let delta;
        if(direction === 'R') {
            delta = {x:1, y: 0};
        }
        else if(direction === 'L') {
            delta = {x:-1, y: 0};
        }
        else if(direction === 'U') {
            delta = {x: 0, y: -1};
        }
        else if(direction === 'D') {
            delta = {x: 0, y: 1};
        }

        for(let i = 0; i < distance; i++) {
            currentX += delta.x;
            currentY += delta.y;
            steps++;
            spots[currentX] = spots[currentX] || [];
            spots[currentX][currentY] = spots[currentX][currentY] || steps;
            items.push({x: currentX, y: currentY, steps});
        }
    }

    return {spots, items};
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let right = parseLine(lines[0]);
    let left = parseLine(lines[1]);
    let minSteps = Infinity;

    for(let item of right.items) {
        if(left.spots[item.x] && left.spots[item.x][item.y]) {
            let steps = item.steps + left.spots[item.x][item.y];
            minSteps = Math.min(steps, minSteps);
        }
    }

    console.log(minSteps);
}).catch((err) => {
    console.log(err, err.stack);
});