let lib = require('../../lib');

let year = 2022;
let day = 22;

const OPEN = 1;
const WALL = 2;
const WRAP = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let map = [];

    let xPos = undefined;
    let yPos = 0;
    let facing = 0;

    let parsingMap = true;
    let instructions;

    const debug = false;

    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        if(parsingMap) {
            if(line) {
                map[y] = [];
                for(let x = 0; x < line.length; x++) {
                    if(line[x] === ' ') {
                        map[y][x] = WRAP;
                    }
                    else {
                        if(xPos === undefined) {
                            xPos = x;
                        }
                        if(lines[y][x] === '.') {
                            map[y][x] = OPEN;
                        }
                        else {
                            map[y][x] = WALL;
                        }
                    }
                }
            }
            else {
                parsingMap = false;
            }
        }
        else {
            instructions = line;
        }
    }

    debug && console.log(`Starting at ${xPos}, ${yPos}`);

    let deltas = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0}, { x: 0, y: -1 }]; 
    const cubeSize = 50;

    // wrapping rules are based on my specific input, won't necessarily work for a differently-arranged cube mesh (though according to AoC creator, everyone got the same shape)
    let wrapRules = {
        '1,0': [null, null, { x: () => 0, y: (x, y) => 149 - y, facing: 0 }, { x: () => 0, y: (x, y) => x + 100, facing: 0 }],
        '2,0': [{ x: () => 99, y: (x, y) => 149 - y, facing: 2 }, { x: () => 99, y: (x, y) => x - 50, facing: 2 }, null, { x: x => x - 100, y: () => 199, facing: 3}],
        '1,1': [{ x: (x, y) => y + 50, y: () => 49, facing: 3 }, null, {x: (x, y) => y - 50, y: () => 100, facing: 1 }, null],
        '0,2': [null, null, { x: () => 50, y: (x, y) => 49 - (y - 100), facing: 0}, { x: () => 50, y: (x, y) => x + 50, facing: 0}],
        '1,2': [{ x: () => 149, y: (x, y) => 49 - (y - 100), facing: 2}, { x: () => 49, y: (x, y) => x + 100, facing: 2}, null, null],
        '0,3': [{ x: (x, y) => y - 100, y: () => 149, facing: 3}, { x: (x, y) => x + 100, y: () => 0, facing: 1}, {x: (x, y) => y - 100, y: () => 0, facing: 1}, null],
    }

    // wrapping rules for sample input
    // let wrapRules = {
    //     '2,0': [{ x: () => 15, y: (x, y) => 15 - y, facing : 2 }, null, { x: (x, y) => y + 4, y: () => 4, facing: 1}, { x: (x, y) => 3 - (x - 8), y: () => 3, facing: 1 }],
    //     '0,1': [null, { x: (x, y) => 11 - x, y: () => 11, facing: 3 }, { x: (x, y) => 15 - (y - 4), y: () => 11, facing: 3}, { x: (x, y) => 11 - y, y: () => 0, facing: 1 }],
    //     '1,1': [null, { x: () => 8, y: (x, y) => 11 - (x - 4), facing: 0 }, null, { x: () => 8, y: (x, y) => x - 4, facing: 0 }],
    //     '2,1': [{ x: (x, y) => 15 - (y - 4), y: () => 8, facing: 1}, null, null, null],
    //     '2,2': [null, { x: (x, y) => 3 - (x - 8), y: () => 7, facing: 3 }, { x: (x, y) => 7 - (y - 8), y: () => 7, facing: 3 }, null],
    //     '3,2': [{ x: () => 11, y: (x, y) => 3 - (y - 8), facing: 2 }, { x: () => 0, y: (x, y) => 7 - (x - 12), facing: 0}, null, { x: () => 11, y: (x, y) => 7 - (x - 12), facing: 2 }],
    // }

    const getCell = (x, y) => {
        if(!map[y] || !map[y][x]) {
            return WRAP;
        }
        return map[y][x];
    }

    while(instructions.length) {
        let step = /^\d+|[RL]/.exec(instructions)[0];
        instructions = instructions.substring(step.length);
        if(step === 'L') {
            facing = (facing + 3) % 4;
            debug && console.log(`Turning Left to facing ${facing}`);
        }
        else if(step === 'R') {
            facing = (facing + 1) % 4;
            debug && console.log(`Turning Right to facing ${facing}`);
        }
        else {
            let distance = +step;
            debug && console.log(`Moving forward ${distance}`);
            let stopped = false;
            let moved = 0;
            while(moved < distance && !stopped) {
                let delta = deltas[facing];
                let newX = xPos + delta.x;
                let newY = yPos + delta.y;
                let newFacing = facing;
                let cell = getCell(newX, newY);

                if(cell === WRAP) {
                    let sideX = Math.floor(xPos / cubeSize);
                    let sideY = Math.floor(yPos / cubeSize);
                    let wrapRule = wrapRules[`${sideX},${sideY}`][facing];
                    newX = wrapRule.x(xPos, yPos);
                    newY = wrapRule.y(xPos, yPos);
                    newFacing = wrapRule.facing;
                    debug && console.log(`Wrapping from ${xPos},${yPos} facing ${facing} to ${newX},${newY} facing ${newFacing}`);
                    cell = getCell(newX, newY)
                }

                if(cell === OPEN) {
                    xPos = newX;
                    yPos = newY;
                    facing = newFacing;
                    debug && console.log(`Moving to ${xPos},${yPos} facing ${facing}`)
                }
                else {
                    stopped = true;
                    debug && console.log(`Stopped by wall at ${newX},${newY}`);
                }
                moved++;
            }
        }
    }

    console.log((yPos + 1) * 1000 + (xPos + 1) * 4 + facing);
}).catch((err) => {
    console.log(err, err.stack);
});