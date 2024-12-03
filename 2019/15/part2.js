let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 15;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let program = intcodes.compile(codes);

    let visited = {};
    let queue = new lib.linkedList();
    queue.push({x: 0, y: 0, steps: 0, program: program});

    let found = false;
    let delta = {
        1: {x: 0, y: -1},
        2: {x: 0, y: 1},
        3: {x: -1, y: 0},
        4: {x: 1, y: 0},
    }

    let grid = [];

    grid[0] = [];
    grid[0][0] = true;
    let oxygenX;
    let oxygenY;

    while(queue.length) {
        let current = queue.shift();
        if(!visited[current.x + ',' + current.y])
        {
            visited[current.x + ',' + current.y] = true;
            let currentProgram = current.program;
            let steps = current.steps + 1;

            for(let direction = 1; direction <= 4; direction++) {
                let newX = current.x + delta[direction].x;
                let newY = current.y + delta[direction].y;
                grid[newX] = grid[newX] || [];
                let newProgram = currentProgram.clone();
                let output = newProgram.run(direction);
                if(output.value === 2) {
                    oxygenX = newX;
                    oxygenY = newY;
                    grid[newX][newY] = true;
                }
                else if(output.value === 0) {
                    visited[newX + ',' + newY] = true;
                    grid[newX][newY] = false;
                }
                else {
                    queue.push({x: newX, y: newY, steps: steps, program: newProgram});
                    grid[newX][newY] = true;
                }
            }
        }
    }

    queue = new lib.linkedList();
    queue.push({x: oxygenX, y: oxygenY, minutes: 0})
    visited = {};
    let maxMinutes = 0;

    while(queue.length) {
        let current = queue.shift();

        if(visited[current.x + ',' + current.y]) {
            continue;
        }
        visited[current.x + ',' + current.y] = true;

        if(grid[current.x][current.y]) {
            maxMinutes = Math.max(current.minutes, maxMinutes);
            for(let direction = 1; direction <= 4; direction++) {
                let currentDelta = delta[direction];
                queue.push({x: current.x + currentDelta.x, y: current.y + currentDelta.y, minutes: current.minutes + 1})
            }
        }
    }

    console.log(maxMinutes);

}).catch((err) => {
    console.log(err, err.stack);
});