let lib = require('../../lib');

let year = 2019;
let day = 3;

function parseLine(line) {
    let spots = [];
    let items = [];
    let currentX = 0;
    let currentY = 0;

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
            spots[currentX] = spots[currentX] || [];
            spots[currentX][currentY] = true;
            items.push({x: currentX, y: currentY});
        }
    }

    return {spots, items};
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let right = parseLine(lines[0]);
    let left = parseLine(lines[1]);
    let minDistance = Infinity;

    for(let item of right.items) {
        if(left.spots[item.x] && left.spots[item.x][item.y]) {
            distance = Math.abs(item.x) + Math.abs(item.y);
            minDistance = Math.min(minDistance, distance);
        }
    }

    console.log(minDistance);
}).catch((err) => {
    console.log(err, err.stack);
});