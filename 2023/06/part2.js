let lib = require('../../lib');

let year = 2023;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let time = +(lines[0].replace(/[^0-9]/g, ''));
    let distance = +(lines[1].replace(/[^0-9]/g, ''));
    let count = 0;
    for(let hold = 1; hold < time; hold++) {
        let raceDistance = (time - hold) * hold;
        if(raceDistance > distance) {
            count++;
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});