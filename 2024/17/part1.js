let lib = require('../../lib');

let year = 2024;
let day = 17;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let registerA = +lines[0].split(': ')[1];
    let registerB = +lines[1].split(': ')[1];
    let registerC = +lines[2].split(': ')[1];
    let program = lines[4].split(': ')[1].split(',').map(x => +x);
    let pointer = 0;
    let outputs = [];

    const getComboOperand = (value) => {
        if(value <= 3) {
            return value;
        }
        if(value === 4) {
            return registerA;
        }
        if(value === 5) {
            return registerB;
        }
        if(value === 6) {
            return registerC;
        }
    }

    const funcs = {
        0: (operand) => {
            let numerator = registerA;
            let denominator = Math.pow(2, getComboOperand(operand));
            registerA = Math.trunc(numerator / denominator);
        },
        1: (operand) => {
            registerB ^= operand;
        },
        2: (operand) => {
            registerB = getComboOperand(operand) % 8;
        },
        3: (operand) => {
            if(registerA !== 0) {
                pointer = operand;
                return true;
            }
        },
        4: () => {
            registerB ^= registerC;
        },
        5: (operand) => {
            outputs.push(getComboOperand(operand) % 8);
        },
        6: (operand) => {
            let numerator = registerA;
            let denominator = Math.pow(2, getComboOperand(operand));
            registerB = Math.trunc(numerator / denominator);
        },
        7: (operand) => {
            let numerator = registerA;
            let denominator = Math.pow(2, getComboOperand(operand));
            registerC = Math.trunc(numerator / denominator);
        },
    }

    while(pointer < program.length)
    {
        if(!funcs[program[pointer]](program[pointer + 1]))
        {
            pointer += 2;
        }
    }

    console.log(outputs.join());
}).catch((err) => {
    console.log(err, err.stack);
});