let lib = require('../../lib');

let year = 2025;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let total = 0;
    for(let line of lines) {
        let maxFirst = 0;
        let firstIndex = 0;
        for(let i = 0; i < line.length - 1; i++)
        {
            let val = +line[i];
            if(val > maxFirst) {
                maxFirst = val;
                firstIndex = i;
            }
        }

        let maxSecond = 0;
        for(let i = firstIndex + 1; i < line.length; i++)
        {
            maxSecond = Math.max(maxSecond, +line[i]);
        }

        total += maxFirst * 10 + maxSecond;
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});