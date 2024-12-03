let lib = require('../../lib');

let year = 2023;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let times = lines[0].split(/\s+/).map(x => +x);
    times.shift();
    let distances = lines[1].split(/\s+/).map(x => +x);
    distances.shift();

    let total = 1;

    for(let i = 0; i < times.length; i++) {
        let time = times[i];
        let distance = distances[i];
        let count = 0;
        for(let hold = 1; hold < time; hold++) {
            let raceDistance = (time - hold) * hold;
            if(raceDistance > distance) {
                count++;
            }
        }
        total *= count;
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});