let lib = require('../../lib');

let year = 2025;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let current = 50;
    let count = 0;
    for(let line of lines) {
        let dir = line[0];
        let distance = +(line.substring(1));
        let multiplier = dir === 'R' ? 1 : -1;
        current += distance * multiplier;
        current %= 100;
        if(current < 0)
        {
            current += 100;
        }

        if(current === 0)
        {
            count ++;
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});