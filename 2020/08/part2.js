let lib = require('../../lib');
let assembly = require('../lib/assembly');

let year = 2020;
let day = 8;

lib.getInput(year, day).then((data) => {
    let originalProgram = assembly.parse(data);
    let changeIndex = 0;

    while(true) {
        let program = originalProgram.clone();
        let state = program.getState();
        while(state.ops[changeIndex].op === 'acc') {
            changeIndex++;
        }
        if(state.ops[changeIndex].op === 'nop') {
            state.ops[changeIndex].op = 'jmp';
        }
        else {
            state.ops[changeIndex].op = 'nop';
        }

        let visited = {};
        let cont = true;

        while(cont) {
            let state = program.getState();
            if(state.pointer >= state.ops.length) {
                console.log(state.accumulator);
                process.exit(0);
            }
            else if(visited[state.pointer]) {
                cont = false;
            }
            else {
                visited[state.pointer] = true;
                program.step();
            }
        }
        changeIndex++;
    }
}).catch((err) => {
    console.log(err, err.stack);
});