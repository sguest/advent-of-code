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

    while(!found) {
        let current = queue.shift();
        if(!visited[current.x + ',' + current.y])
        {
            visited[current.x + ',' + current.y] = true;
            let currentProgram = current.program;
            let steps = current.steps + 1;

            for(let direction = 1; direction <= 4; direction++) {
                let newX = current.x + delta[direction].x;
                let newY = current.y + delta[direction].y;
                let newProgram = currentProgram.clone();
                let output = newProgram.run(direction);
                if(output.value === 2) {
                    console.log(steps);
                    found = true;
                }
                else if(output.value === 0) {
                    visited[newX + ',' + newY] = true;
                }
                else {
                    queue.push({x: newX, y: newY, steps: steps, program: newProgram});
                }
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});