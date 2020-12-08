let lib = require('../../lib');

let year = 2020;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let ops = [];
    for(let line of lines) {
        ops.push(line);
    }

    let visited = {};
    let accumulator = 0;
    let pointer = 0;

    while(true) {
        if(visited[pointer]) {
            console.log(accumulator);
            process.exit(0);
        }
        visited[pointer] = true;

        let parts = ops[pointer].split(' ');

        switch(parts[0]) {
            case 'acc':
                accumulator += (+parts[1]);
                pointer++;
                break;
            case 'jmp':
                pointer += (+parts[1]);
                break;
            case 'nop':
                pointer++;
                break;
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});