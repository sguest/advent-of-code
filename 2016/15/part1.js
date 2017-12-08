let lib = require('../../lib');

let year = 2016;
let day = 15;

lib.getInput(year, day).then((data) => {
    let parser = /^Disc #\d+ has (\d+) positions; at time=0, it is at position (\d+)\.$/;
    let discs = [];
    for(let line of data.split('\n')) {
        let parsed = parser.exec(line);
        discs.push({
            positions: parseInt(parsed[1], 10),
            start: parseInt(parsed[2], 10)
        });
    }

    let time = 0;

    main:
    while(true) {
        for(let discIndex = 0; discIndex < discs.length; discIndex++) {
            let disc = discs[discIndex];
            if((disc.start + time + discIndex + 1) % disc.positions) {
                time++;
                continue main;
            }
        }
        break;
    }

    console.log(time);
});