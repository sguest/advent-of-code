let lib = require('../../lib');

let year = 2017;
let day = 8;

lib.getInput(year, day).then((data) => {
    let parser = /^([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) (!=|>|>=|==|<|<=) (-?\d+)$/;
    let comparisons = {
        '!=': (a, b) => a !== b,
        '>':(a, b) => a > b,
        '>=': (a, b) => a >= b,
        '==': (a, b) => a === b,
        '<': (a, b) => a < b,
        '<=': (a, b) => a <= b
    };
    let maxValue = 0;

    let registers = {};

    function getValue(name) {
        return registers[name] || 0;
    }

    for(let line of data.split('\n')) {
        let parsed = parser.exec(line);

        if(comparisons[parsed[5]](getValue(parsed[4]), parseInt(parsed[6], 10))) {
            if(parsed[2] === 'inc') {
                registers[parsed[1]] = getValue(parsed[1]) + parseInt(parsed[3], 10);
            }
            else {
                registers[parsed[1]] = getValue(parsed[1]) - parseInt(parsed[3], 10);
            }

            maxValue = Math.max(maxValue, registers[parsed[1]]);
        }
    }      

    let values = [];
    for(let index in registers) {
        values.push(registers[index]);
    }
    console.log(maxValue);
});