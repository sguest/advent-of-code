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
            let address = (+match[1]).toString(2);
            let value = +match[2];
            while(address.length < mask.length) {
                address = '0' + address;
            }
            let addresses = [''];
            for(let i = 0; i < mask.length; i++) {
                let addressLength = addresses.length;
                for(let j = 0; j < addressLength; j++) {
                    if(mask[i] === '0') {
                        addresses[j] += address[i];
                    }
                    else if(mask[i] === '1') {
                        addresses[j] += '1';
                    }
                    else if(mask[i] === 'X') {
                        addresses.push(addresses[j] + '1');
                        addresses[j] += '0';
                    }
                }
            }

            for(let a of addresses) {
                memory[parseInt(a, 2)] = value;
            }
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