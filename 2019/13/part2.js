let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 13;

function getState(program, state, input) {
    while(true) {
        let output = program.run(input);
        input = undefined;
        if(output.signal === 'input' || output.signal === 'end') {
            if(output.signal === 'end') {
                state.ended = true;
            }
            break;
        }
        let x = output.value;
        output = program.run();
        if(output.signal === 'input' || output.signal === 'end') {
            if(output.signal === 'end') {
                state.ended = true;
            }
            break;
        }
        let y = output.value;
        output = program.run();
        if(output.signal === 'input' || output.signal === 'end') {
            if(output.signal === 'end') {
                state.ended = true;
            }
            break;
        }

        if(x === -1 && y === 0) {
            state.score = output.value
        }
        else if(output.value === 4) {
            state.ballPos = {x, y};
        }
        else if(output.value === 3) {
            state.paddlePos = {x, y};
        }
        state.grid[x] = state.grid[x] || [];
        state.grid[x][y] = output.value;
    }

    return state
}

function draw(grid) {
    process.stdout.write('\033c');
    for(let y = 0; y < grid[0].length; y++) {
        let output = '';
        for(let x = 0; x < grid.length; x++) {
            switch(grid[x][y]) {
                case 0:
                    output += ' ';
                    break;
                case 1:
                    output += '█';
                    break;
                case 2:
                    output += 'X';
                    break;
                case 3:
                    output += '_';
                    break;
                case 4:
                    output += 'O';
                    break;
            }
        }
        console.log(output);
    }

}

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    codes[0] = 2;
    let program = intcodes.compile(codes);

    let state = getState(program, {score: 0, grid: []});

    while(!state.ended) {
        let nextMove;
        if(state.ballPos.x < state.paddlePos.x) {
            nextMove = -1;
        }
        else if(state.ballPos.x > state.paddlePos.x) {
            nextMove = 1;
        }
        else {
            nextMove = 0;
        }
        //draw(state.grid);
        state = getState(program, state, nextMove);
    }

    console.log(state.score);
}).catch((err) => {
    console.log(err, err.stack);
});