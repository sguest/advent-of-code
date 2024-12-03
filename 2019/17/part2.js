let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 17;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let program = intcodes.compile(codes);

    let output = program.run();
    let grid = [];
    let x = 0;
    let y = 0;
    let bot;

    while(output.signal !== 'end') {
        if(output.value === 10) {
            x = 0;
            y++;
        }
        else {
            grid[x] = grid[x] || [];
            grid[x][y] = (output.value !== 46);
            
            if(output.value === 94) {
                bot = {x, y, dir: 'u'};
            }
            else if(output.value === 60) {
                bot = {x, y, dir: 'l'};
            }
            else if(output.value === 62) {
                bot = {x, y, dir: 'r'};
            }
            else if(output.value === 118) {
                bot = {x, y, dir: 'd'};
            }
            x++;
        }
        output = program.run();
    }

    let deltas = {
        u: {x: 0, y: -1},
        l: {x: -1, y: 0},
        r: {x: 1, y: 0},
        d: {x: 0, y: 1},
    }

    let turns = {
        u: {l: 'l', r: 'r'},
        l: {l: 'd', r: 'u'},
        r: {l: 'u', r: 'd'},
        d: {l: 'r', r: 'l'},
    }

    let instructions = [];
    let pathfinding = true;
    let currentLength = 0;
    while(pathfinding) {
        let delta = deltas[bot.dir];
        let target = {x: bot.x + delta.x, y: bot.y + delta.y};
        if(grid[target.x] && grid[target.x][target.y]) {
            currentLength++;
            bot.x = target.x;
            bot.y = target.y;
        }
        else {
            if(currentLength > 0) {
                instructions.push(currentLength.toString());
            }
            currentLength = 0;
            pathfinding = false;
            for(let turn of ['l', 'r']) {
                let newDirection = turns[bot.dir][turn];
                let newDelta = deltas[newDirection];
                let newTarget = {x: bot.x + newDelta.x, y: bot.y + newDelta.y};
                if(grid[newTarget.x] && grid[newTarget.x][newTarget.y]) {
                    pathfinding = true;
                    bot.dir = newDirection;
                    instructions.push(turn.toUpperCase());
                }
            }
        }
    }

    let instructionString = instructions.join(',');

    let functionNames = ['A', 'B', 'C'];
    let functions = {};

    //allowing the assumption that each function will be used at least 3x
    //slightly less generalized but makes for much easier implementation
    for(let functionName of functionNames) {
        let programLength = 20;
        let startPosition = 0;
        while(/[ABC]/.test(instructionString[startPosition])) {
            startPosition += 2;
        }
        while(programLength > 0) {
            let candidate = instructionString.substring(startPosition, startPosition + programLength);
            let firstIndex = instructionString.indexOf(candidate, programLength);
            if(firstIndex !== -1 && !/[ABC]/.test(candidate)) {
                let secondIndex = instructionString.indexOf(candidate, firstIndex + 1);
                if(secondIndex !== -1) {
                    candidate = candidate.replace(/,$/, '');
                    functions[functionName] = candidate;
                    instructionString = instructionString.replace(new RegExp(candidate, 'g'), functionName);
                    break;
                }
            }
            programLength--;
        }
    }

    codes = intcodes.parse(data);
    codes[0] = 2;
    program = intcodes.compile(codes);

    let inputs = [instructionString, functions.A, functions.B, functions.C, 'n'];

    output = program.run();

    while(output.signal === 'output')
    {
        output = program.run();
    }

    for(let input of inputs) {
        output = program.readString(input, 10);

        if(output.signal === 'output') {
            console.log(output.value);
            process.exit(0);
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});