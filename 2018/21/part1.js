let lib = require('../../lib');

let year = 2018;
let day = 21;

let ops = {
    addr: (reg, a, b) => reg[a] + reg[b],
    addi: (reg, a, b) => reg[a] + b,
    mulr: (reg, a, b) => reg[a] * reg[b],
    muli: (reg, a, b) => reg[a] * b,
    banr: (reg, a, b) => reg[a] & reg[b],
    bani: (reg, a, b) => reg[a] & b,
    borr: (reg, a, b) => reg[a] | reg[b],
    bori: (reg, a, b) => reg[a] | b,
    setr: (reg, a, b) => reg[a],
    seti: (reg, a, b) => a,
    gtir: (reg, a, b) => a > reg[b] ? 1 : 0,
    gtri: (reg, a, b) => reg[a] > b ? 1 : 0,
    gtrr: (reg, a, b) => reg[a] >  reg[b] ? 1 : 0,
    eqir: (reg, a, b) => a === reg[b] ? 1 : 0,
    eqri: (reg, a ,b) => reg[a] === b ? 1 : 0,
    eqrr: (reg, a, b) => reg[a] === reg[b] ? 1 : 0
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let ipLine = lines.shift();
    let ip = +(ipLine.split(' ')[1]);

    let instructions = [];
    for(let line of lines) {
        instructions.push(line.split(' ').map(x => {
            if(isNaN(+x)) {
                return x;
            }
            return +x;
        }));
    }

    let registers = [0, 0, 0, 0, 0, 0];

    while(registers[ip] >= 0 && registers[ip] < instructions.length)
    {
        if(registers[ip] === 28) {
            console.log(registers[4]);
            break;
        }
        let current = instructions[registers[ip]];

        let result = ops[current[0]](registers, current[1], current[2]);

        registers[current[3]] = result;

        registers[ip]++;
    }
}).catch((err) => {
    console.log(err.stack);
});