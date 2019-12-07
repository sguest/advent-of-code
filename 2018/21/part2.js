let lib = require('../../lib');

let year = 2018;
let day = 21;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let const1 = +(lines[8].split(' ')[1]);
    let const2 = +(lines[12].split(' ')[2]);

    let last = 0;
    let found = {};

    let c, d, e = 0;

    while(true) {
        if(found[e]) {
            console.log(last);
            break;
        }
        else {
            found[e] = true;
            last = e;
        }

        d = e | 0x10000;
        e = const1;
        while(d > 0) {
            c = d & 0xff;
            e = ((e + c) & 0xffffff) * const2 & 0xffffff;
            d = d >> 8;
        }
    }
}).catch((err) => {
    console.log(err.stack);
});