let lib = require('../../lib');

let year = 2025;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let parsingRanges = true;
    let ranges = [];
    let count = 0;

    for(let line of lines) {
        if(line === '') {
            parsingRanges = false;
        }
        else if(parsingRanges) {
            let values = line.split('-').map(x => +x);
            ranges.push({start: values[0], end: values[1]});
        }
        else {
            let item = +line;
            let found = false;
            for(let range of ranges) {
                if(item >= range.start && item <= range.end) {
                    found = true;
                }
            }
            if(found) {
                count++;
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});