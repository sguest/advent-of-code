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
        let fromZero = current === 0;
        let counted = false;
        current += distance * multiplier;
        while(current >= 100)
        {
            current-= 100;
            count++;
            counted = true;
        }

        while(current < 0)
        {
            current += 100;
            if(fromZero)
            {
                fromZero = false;
            }
            else
            {
                count++;
            }
        }

        if(current === 0 && !counted)
        {
            count ++;
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});