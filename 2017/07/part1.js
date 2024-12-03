let lib = require('../../lib');

let year = 2017;
let day = 7;

lib.getInput(year, day).then((data) => {
    let isChild = {};
    let candidates = [];
    for(let line of data.split('\n')) {
        if(line.indexOf('>') === -1) {
            continue;
        }

        let items = line.split('>');
        items = items[1].split(',').map((x) => x.trim());
        let current = line.split(' ')[0];
        candidates.push(current);
        for(let item of items) {
            isChild[item] = true;
        }
    }

    for(let candidate of candidates) {
        if(!isChild[candidate]) {
            console.log(candidate);
            break;
        }
    }
});