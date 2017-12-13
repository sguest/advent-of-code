let lib = require('../../lib');

let year = 2017;
let day = 13;

lib.getInput(year, day).then((data) => {
    let scanners = {};
    let maxDepth;
    for(let line of data.split('\n')) {
        let parts = line.split(': ').map(x => parseInt(x, 10));
        scanners[parts[0]] = parts[1];
        maxDepth = parts[0];
    }

    let delay = 0;
    let found = true;

    while(found)
    {
        found = false;
        for(let depth in scanners) {
            if((parseInt(depth, 10) + delay) % ((scanners[depth] - 1) * 2) === 0) {
                found = true;
                break;
            }
        }
        if(found) {
            delay++;
        }
    }

    console.log(delay);
});