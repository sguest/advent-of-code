let lib = require('../../lib');

let year = 2017;
let day = 23;

lib.getInput(year, day).then((data) => {
    let instructions = [];
    for(let line of data.split('\n')) {
        instructions.push(line);
    }      

    let registers = {a: 0, b:0,c:0,d:0,e:0,f:0,g:0,h:0};

    let pointer = 0;

    let mulCount = 0;

    function getValue(val) {
        if(isNaN(val)) {
            return registers[val] || 0;
        }

        return parseInt(val, 10);
    }

    while(pointer >=0 && pointer < instructions.length) {
        let parts = instructions[pointer].split(' ');

        let inst = parts[0];

        if(inst === 'set') {
            registers[parts[1]] = getValue(parts[2]);
            pointer++;
        }
        else if(inst === 'sub') {
            registers[parts[1]] -= getValue(parts[2]);
            pointer++;
        }
        else if(inst === 'mul') {
            registers[parts[1]] *= getValue(parts[2]);
            pointer++;
            mulCount++;
        }
        else if(inst === 'jnz') {
            if(getValue(parts[1]) !== 0) {
                pointer += getValue(parts[2]);
            }
            else {
                pointer++;
            }
        }
    }

    console.log(mulCount);

}).catch((err) => {
    console.log(err.stack);
});