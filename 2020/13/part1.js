let lib = require('../../lib');

let year = 2020;
let day = 13;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let startTime = +lines[0];
    let buses = lines[1].split(',').filter(x => x !== 'x').map(x => +x);

    let nextBus = 0;
    let waitTime = Infinity;
    for(let bus of buses) {
        let currentTime = 0;
        while(currentTime < startTime) {
            currentTime += bus;
        }
        let time = currentTime - startTime;
        if(time < waitTime) {
            waitTime = time;
            nextBus = bus;
        }
    }

    console.log(nextBus * waitTime);
}).catch((err) => {
    console.log(err, err.stack);
});