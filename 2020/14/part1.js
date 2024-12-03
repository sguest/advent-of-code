let lib = require('../../lib');

let year = 2020;
let day = 14;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let memory = {};
    let mask = '';
    for(let line of lines) {
        if(/^mask/.test(line)) {
            mask = line.split(' = ')[1];
        }
        else {
            let match = /^mem\[(\d+)\] = (\d+)/.exec(line);
            let address = +match[1];
            let value = (+match[2]).toString(2);
            while(value.length < mask.length) {
                value = '0' + value;
            }
            let maskedValue = '';
            for(let i = 0; i < mask.length; i++) {
                if(mask[i] === 'X') {
                    maskedValue += value[i];
                }
                else {
                    maskedValue += mask[i];
                }
            }

            memory[address] = parseInt(maskedValue, 2);
        }
    }

    let total = 0;
    for(let address in memory) {
        total += memory[address];
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});