let lib = require('../../lib');

let year = 2025;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let parsingRanges = true;
    let ranges = [];

    for(let line of lines) {
        let newRanges = [];
        if(line === '') {
            parsingRanges = false;
        }
        else if(parsingRanges) {
            let values = line.split('-').map(x => +x);
            let start = values[0];
            let end = values[1];
            for(let existingRange of ranges) {
                if((start <= existingRange.end && existingRange.start <= end)) {
                    start = Math.min(start, existingRange.start);
                    end = Math.max(end, existingRange.end);
                }
                else
                {
                    newRanges.push(existingRange);
                }
            }
            newRanges.push({ start, end });
            ranges = newRanges;
        }
    }

    let count = 0;
    for(let range of ranges) {
        count += range.end - range.start + 1;
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});