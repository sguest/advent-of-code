let lib = require('../../lib');

let year = 2021;
let day = 2;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let depth = 0;
    let position = 0;
    for(let line of lines) {
        let parts = line.split(' ');
        let amount = +parts[1];
        switch(parts[0]) {
            case 'forward':
                position += amount;
                break;
            case 'up':
                depth -= amount;
                break;
            case 'down':
                depth += amount;
                break;
        }
    }
    console.log(depth * position);
}).catch((err) => {
    console.log(err, err.stack);
});