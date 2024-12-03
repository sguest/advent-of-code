let lib = require('../../lib');

let year = 2022;
let day = 25;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    let values = {
        2: 2,
        1: 1,
        0: 0,
        '-': -1,
        '=': -2,
    };

    for(let line of lines) {
        let value = 0;
        for(let i = line.length - 1; i >= 0; i--) {
            let power = line.length - 1 - i;
            let placeValue = values[line[i]];
            value += placeValue * Math.pow(5, power);
        }
        total += value;
    }

    let power = 1;

    while(total > power * 2) {
        power *= 5;
    }

    let result = '';
    let digits = {
        2: 2,
        1: 1,
        0: 0,
        '-1': '-',
        '-2': '=',
    };

    while(power >= 1) {
        let nextPower = power / 5;
        let digit = 0;
        if(total > 0) {
            if(total >= power) {
                digit++;
                total -= power;
            }
            if(total >= nextPower * 2) {
                digit++;
                total -= power;
            }
        }
        else {
            if(total <= -power) {
                digit--;
                total += power;
            }
            if(total <= nextPower * -2) {
                digit--;
                total += power;
            }
        }
        result += digits[digit];
        power = nextPower;
    }

    console.log(result);

}).catch((err) => {
    console.log(err, err.stack);
});