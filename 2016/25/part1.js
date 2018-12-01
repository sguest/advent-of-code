let lib = require('../../lib');

let year = 2016;
let day = 25;

function getValue(registers, value) 
{
    if(isNaN(value)) {
        return registers[value] || 0;
    }
    
    return Number(value);
}

let toggles = {
    cpy: 'jnz',
    inc: 'dec',
    dec: 'inc',
    jnz: 'cpy',
    tgl: 'inc'
}

function evaluate(registers, lines) {
    let index = 0;
    let outputCount = 0;
    let lastOutput = 1;

    while(index < lines.length)
    {
        let line = lines[index];
        switch(line.substring(0,3)) {
            case 'cpy': {
                let parsed = /cpy ([a-z]|-?\d+) ([a-z])/.exec(line);
                if(parsed) {
                    registers[parsed[2]] = getValue(registers, parsed[1]);
                }
                index++;
                break;
            }
            case 'inc': {
                let register = line.substring(4,5);
                registers[register] = getValue(registers, register) + 1;
                index++;
                break;
            }
            case 'dec': {
                let register = line.substring(4,5);
                registers[register] = getValue(registers, register) - 1;
                index++;
                break;
            }
            case 'jnz': {
                let parsed = /jnz ([a-z]|-?\d+) ([a-z]|-?\d+)/.exec(line);
                if(getValue(registers, parsed[1]) !== 0) {
                    index += getValue(registers, parsed[2]);
                }
                else {
                    index++;
                }
                break;
            }
            case 'tgl': {
                let parsed = /tgl ([a-z]|-?\d+)/.exec(line);
                let targetIndex = index + getValue(registers, parsed[1]);
                let targetInstruction = lines[targetIndex];
                if(targetInstruction) {
                    lines[targetIndex] = targetInstruction.replace(/^[a-z]{3}/, function(val) { return toggles[val]; });
                }
                index++;
                break;
            }
            case 'add': {
                let parsed = /add ([a-z]|-?\d+) ([a-z])/.exec(line);
                registers[parsed[2]] += getValue(registers, parsed[1]);
                index++;
                break;
            }
            case 'sub': {
                let parsed = /sub ([a-z]) ([a-z])/.exec(line);
                registers[parsed[2]] -= getValue(registers, parsed[1]);
                index++;
                break;
            }
            case 'mul': {
                let parsed = /mul ([a-z]) ([a-z])/.exec(line);
                registers[parsed[2]] *= Math.abs(getValue(registers, parsed[1]));
                index++;
                break;
            }
            case 'out': {
                let nextValue = registers.b;
                if(nextValue !== 0 && nextValue !== 1) {
                    return false;
                }
            
                if(lastOutput === nextValue) {
                    return false;
                }

                lastOutput = nextValue;
                outputCount++;
                
                if(outputCount >= 200) {
                    return true;
                }
            }
            default: {
                index++;
                break;
            }
        }
    }
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let a = 1;
    
    let registers = { a };
    
    while(!evaluate(registers, lines)) {
        a++;
        registers = { a };
    }
    
    console.log(a);
}).catch((err) => {
    console.log(err.stack);
});