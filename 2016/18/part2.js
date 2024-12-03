let lib = require('../../lib');

let year = 2016;
let day = 18;

lib.getInput(year, day).then((data) => {
    let line = data.split('').map(x => x === '^');
    let safe = line.reduce((a,b) => a + !b, 0);
    
    for(let step = 0; step < 399999; step++) {
        let newLine = [];

        for(let x = 0; x < line.length; x++) {
            newLine.push(line[x - 1] ^ line[x + 1]);
        }

        line = newLine;
        safe += line.reduce((a,b) => a + !b, 0);
    }

    console.log(safe);
});