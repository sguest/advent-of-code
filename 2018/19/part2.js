let lib = require('../../lib');

let year = 2018;
let day = 19;

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

    let registers = [1, 0, 0, 0, 0, 0];

    //The input program will not finish for a very long time, so we'll have to shortcut
    //First, let the program finish its "initialization" logic, which is done
    //once it's about to execute instruction 1
    while(registers[ip] !== 1)
    {
        let current = instructions[registers[ip]];

        let result = ops[current[0]](registers, current[1], current[2]);

        registers[current[3]] = result;

        registers[ip]++;
    }

    //Now the program has put a large number in some register.
    //It proceeds to very inefficiently calculate the sum of that number's factors
    //we're going to do so more efficiently
    let target = Math.max(...registers);
    let sqrt = Math.sqrt(target);
    let sum = 0;

    for(let i = 1; i < sqrt; i++) {
        if(target % i === 0) {
            sum += i + target / i;
        }
    }

    if(sqrt === Math.floor(sqrt)) {
        sum += sqrt;
    }

    console.log(sum);
}).catch((err) => {
    console.log(err.stack);
});