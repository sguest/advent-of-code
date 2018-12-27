let lib = require('../../lib');

let year = 2017;
let day = 18;


lib.getInput(year, day).then((data) => {
    function getVal(reg, program) {
        if(isNaN(reg)) {
            return program.registers[reg] || 0;            
        }
        return parseInt(reg, 10);
    }

    let lines = data.split('\n');
    let program1 = {index: 0, registers: {p: 0}, queue: [], sendCount: 0};
    let program2 = {index: 0, registers: {p: 1}, other: program1, queue: [], sendCount: 0};
    program1.other = program2;
    let currentProgram = program1;
    
    while(true) {
        let line = lines[currentProgram.index];
        let parsed = /^set ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            currentProgram.registers[parsed[1]] = getVal(parsed[2], currentProgram);
            currentProgram.index++;
            continue;
        }
        parsed = /^add ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            currentProgram.registers[parsed[1]] += getVal(parsed[2], currentProgram);
            currentProgram.index++;
            continue;
        }
        
        parsed = /^mul ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            currentProgram.registers[parsed[1]] *= getVal(parsed[2], currentProgram);
            currentProgram.index++;
            continue;
        }

        parsed = /^mod ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            currentProgram.registers[parsed[1]] %= getVal(parsed[2], currentProgram);
            currentProgram.index++;
            continue;
        }

        parsed = /^snd ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            let sentValue = getVal(parsed[1], currentProgram);
            currentProgram.other.queue.push(sentValue);
            currentProgram.index++;
            currentProgram.sendCount++;
            continue;
        }

        parsed = /^rcv ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            if(currentProgram.queue.length) {
                currentProgram.registers[parsed[1]] = currentProgram.queue.shift();
                currentProgram.index++;
                continue;
            }
            else {
                if(currentProgram.other.queue.length === 0 && lines[currentProgram.other.index].startsWith('rcv')) {
                    console.log(program2.sendCount);
                    break;
                }
                else {
                    currentProgram = currentProgram.other;                    
                }
            }
        }

        parsed = /^jgz ([a-z]|-?\d+) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            if(getVal(parsed[1], currentProgram) > 0) {
                currentProgram.index += getVal(parsed[2], currentProgram);
            }
            else {
                currentProgram.index++;
            }
            continue;
        }
        //console.log('Error unrec ' + line)
    }
});