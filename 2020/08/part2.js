let lib = require('../../lib');

let year = 2020;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let baseOps = [];
    for(let line of lines) {
        baseOps.push(line);
    }

    let changeIndex = 0;

    while(true) {
        let ops = baseOps.slice(0);
        while(ops[changeIndex].split(' ')[0] === 'acc') {
            changeIndex++;
        }
        if(ops[changeIndex].split(' ')[0] === 'nop') {
            ops[changeIndex] = 'jmp ' + ops[changeIndex].split(' ')[1];
        }
        else {
            ops[changeIndex] = 'nop +1';
        }

        let visited = {};
        let accumulator = 0;
        let pointer = 0;

        prog: while(true) {
            if(pointer >= ops.length) {
                console.log(accumulator);
                process.exit(0);
            }
            else if(visited[pointer]) {
                break prog;
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
        changeIndex++;
    }
}).catch((err) => {
    console.log(err, err.stack);
});