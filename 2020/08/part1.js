let lib = require('../../lib');
let assembly = require('../lib/assembly');

let year = 2020;
let day = 8;

lib.getInput(year, day).then((data) => {
    let program = assembly.parse(data);

    let visited = {};

    while(true) {
        let state = program.getState();
        if(visited[state.pointer]) {
            console.log(state.accumulator);
            process.exit(0);
        }
        visited[state.pointer] = true;
        program.step();
    }
}).catch((err) => {
    console.log(err, err.stack);
});