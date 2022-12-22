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

    let deltas = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0}, { x: 0, y: -1 }];

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
        }
        else if(step === 'R') {
            facing = (facing + 1) % 4;
        }
        else {
            let distance = +step;
            let delta = deltas[facing];
            let stopped = false;
            let moved = 0;
            while(moved < distance && !stopped) {
                let newX = xPos + delta.x;
                let newY = yPos + delta.y;
                let cell = getCell(newX, newY);

                if(cell === WRAP) {
                    newX = xPos;
                    newY = yPos;
                    while(getCell(newX, newY) !== WRAP) {
                        newX -= delta.x;
                        newY -= delta.y;
                    }
                    newX += delta.x;
                    newY += delta.y;
                    cell = getCell(newX, newY)
                }

                if(cell === OPEN) {
                    xPos = newX;
                    yPos = newY;
                }
                else {
                    stopped = true;
                }
                moved++;
            }
        }
    }

    console.log((yPos + 1) * 1000 + (xPos + 1) * 4 + facing);
}).catch((err) => {
    console.log(err, err.stack);
});