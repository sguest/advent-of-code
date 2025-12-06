let lib = require('../../lib');

let year = 2024;
let day = 17;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let registerA = +lines[0].split(': ')[1];
    let registerB = +lines[1].split(': ')[1];
    let registerC = +lines[2].split(': ')[1];
    let programString = lines[4].split(': ')[1];
    let program = programString.split(',').map(x => BigInt(+x));
    let pointer = 0;
    let outputs;

    const getComboOperand = (value) => {
        if(value <= 3n) {
            return value;
        }
        if(value === 4n) {
            return registerA;
        }
        if(value === 5n) {
            return registerB;
        }
        if(value === 6n) {
            return registerC;
        }
    }

    const funcs = {
        0: (operand) => {
            registerA = registerA >> getComboOperand(operand);
        },
        1: (operand) => {
            registerB ^= BigInt(operand);
        },
        2: (operand) => {
            registerB = BigInt(getComboOperand(operand)) % 8n;
        },
        3: (operand) => {
            if(registerA !== 0n) {
                pointer = operand;
                return true;
            }
        },
        4: () => {
            registerB ^= registerC;
        },
        5: (operand) => {
            outputs.push(getComboOperand(operand) % 8n);
        },
        6: (operand) => {
            registerB = registerA >> getComboOperand(operand);
        },
        7: (operand) => {
            registerC = registerA >> getComboOperand(operand);
        },
    }

    // With some reverse-engineering, the input represents a single loop where the output from each loop is only dependent on a
    // and a is divided by 8 and floored (i.e. bit-shifted right by 3) after each loop, and the program ends when a reaches 0
    // therefore, work backwards finding the necessary value of a to produce each desired output, then append it to the front for the next iteration
    let startA = 1n;
    for(let digit = 0; digit < program.length; digit++)
    {
        let found =false

        while(!found)
        {
            registerA = BigInt(startA);
            registerB = 0n;
            registerC = 0n;
            pointer = 0n;
            outputs = [];
            while(pointer < program.length)
            {
                if(!funcs[program[pointer]](program[pointer + 1n]))
                {
                    pointer += 2n;
                }
            }

            let valid = true;

            for(let i = 0; i <= digit; i++)
            {
                if(program[program.length - i - 1] !== outputs[outputs.length - i - 1]) {
                    valid = false;
                }
            }

            if(valid) {
                found = true;
                startA *= 8n;
            }
            else
            {
                startA++;
            }
        }
    }

    console.log((startA / 8n).toString());
}).catch((err) => {
    console.log(err, err.stack);
});