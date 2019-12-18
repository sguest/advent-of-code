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

    //console.log(instructions);

    codes = intcodes.parse(data);
    codes[0] = 2;
    program = intcodes.compile(codes);

    //todo: figure out how to generate this instead of doing it by hand
    let functions = {
        A: ['L','10','L','12','R','6'],
        B: ['R','10','L','4','L','4','L','12'],
        C: ['L','10','R','10','R','6','L','4'],
    }

    let main = ['A','B','A','B','A','C','B','C','A','C']

    let inputs = [main, functions.A, functions.B, functions.C, ['n']];

    output = program.run();

    while(output.signal === 'output')
    {
        output = program.run();
    }

    for(let input of inputs) {
        let inputString = input.join(',');
        let inputValues = [].map.call(inputString, x => x.charCodeAt(0))
        program.run(inputValues);
        output = program.run([10])

        let result = '';
        while(output.signal === 'output') {
            if(output.value > 255) {
                console.log(output.value);
                process.exit(0);
            }
            output = program.run();
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});