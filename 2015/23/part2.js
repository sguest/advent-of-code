let lib = require('../../lib');

let year = 2015;
let day = 23;

lib.getInput(year, day).then((data) => {
    let ops = [];

    for(let line of data.split('\n')) {
        ops.push(line.split(/,? /));
    }

    let pointer = 0;
    let registers = { a: 1, b: 0 };

    while(pointer >= 0 && pointer < ops.length) {
        let current = ops[pointer];
        let instruction = current[0];
        if(instruction === 'hlf') {
            registers[current[1]] /= 2;
            pointer++;
        }
        else if(instruction === 'tpl') {
            registers[current[1]] *= 3;
            pointer++;
        }
        else if(instruction === 'inc') {
            registers[current[1]]++;
            pointer++;
        }
        else if(instruction === 'jmp') {
            pointer += parseInt(current[1], 10);
        }
        else if(instruction === 'jie') {
            if(registers[current[1]] % 2 === 0) {
                pointer += parseInt(current[2], 10);
            }
            else {
                pointer++;
            }
        }
        else if(instruction === 'jio') {
            if(registers[current[1]] === 1) {
                pointer += parseInt(current[2], 10);
            }
            else {
                pointer++;
            }
        }
    }

    console.log(registers.b);
}).catch((err) => {
    console.log(err.stack);
});