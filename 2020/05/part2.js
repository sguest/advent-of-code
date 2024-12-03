let lib = require('../../lib');

let year = 2020;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let seats = [];
    let minValue = Infinity;

    for(let line of lines) {
        let min = 0;
        let max = 127;

        for(let i = 0; i < 7; i++) {
            let range = max - min + 1;
            if(line[i] === 'F') {
                max -= range / 2;
            }
            else {
                min += range / 2;
            }
        }

        let row = min;

        min = 0;
        max = 7;

        for(let i = 7; i < 10; i++) {
            let range = max - min + 1;

            if(line[i] === 'L') {
                max -= range / 2;
            }
            else {
                min += range / 2;
            }
        }

        let column = min;
        let id = row * 8 + column;
        seats[id] = true;
        minValue = Math.min(id, minValue);
    }

    let current = minValue;

    while(true) {
        if(!seats[current]) {
            console.log(current);
            process.exit(0);
        }
        current++;
    }

}).catch((err) => {
    console.log(err, err.stack);
});