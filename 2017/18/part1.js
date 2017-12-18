let lib = require('../../lib');

let year = 2017;
let day = 18;

lib.getInput(year, day).then((data) => {
    let registers = {};
    let lastSound = 0;

    function getVal(reg) {
        if(isNaN(reg)) {
            return registers[reg] || 0;            
        }
        return parseInt(reg, 10);
    }

    let lines = data.split('\n');
    let index = 0;

    while(true) {
        let line = lines[index];
        let parsed = /^set ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            registers[parsed[1]] = getVal(parsed[2]);
            index++;
            continue;
        }
        parsed = /^add ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            registers[parsed[1]] += getVal(parsed[2]);
            index++;
            continue;
        }
        
        parsed = /^mul ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            registers[parsed[1]] *= getVal(parsed[2]);
            index++;
            continue;
        }

        parsed = /^mod ([a-z]) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            registers[parsed[1]] %= getVal(parsed[2]);
            index++;
            continue;
        }

        parsed = /^snd ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            lastSound = getVal(parsed[1]);
            index++;
            continue;
        }

        parsed = /^rcv ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            if(getVal(parsed[1]) !== 0) {
                console.log(lastSound);
                break;
            }
            index++;
            continue;
        }

        parsed = /^jgz ([a-z]|-?\d+) ([a-z]|-?\d+)$/.exec(line);
        if(parsed) {
            if(getVal(parsed[1]) > 0) {
                index += getVal(parsed[2]);
            }
            else {
                index++;
            }
            continue;
        }
        console.log('Error unrec ' + line)
    }
});