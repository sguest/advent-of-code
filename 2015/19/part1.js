let lib = require('../../lib');

let year = 2015;
let day = 19;

lib.getInput(year, day).then((data) => {
    let subs = [];
    let target = '';
    for(let line of data.split('\n')) {
        if(line.length) {
            let parts = line.split(' => ');
            if(parts.length > 1) {
                subs.push({start: parts[0], end: parts[1]});
            }
            else {
                target = line;
            }
        }
    }

    let found = {};
    let foundCount = 0;

    for(let sub of subs) {
        let parts = target.split(sub.start);
        for(let index = 0; index < parts.length - 1; index++) {
            let result = parts.slice(0, index + 1).join(sub.start) + sub.end + parts.slice(index + 1).join(sub.start);
            if(!found[result]) {
                found[result] = true;
                foundCount++;
            }
        }
    }

    console.log(foundCount);
});