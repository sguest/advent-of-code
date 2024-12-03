let lib = require('../../lib');

let year = 2016;
let day = 20;

lib.getInput(year, day).then((data) => {
    let ranges = [];

    for(let line of data.split('\n')) {
        let parts = line.split('-').map(x => parseInt(x, 10));
        ranges.push({start: parts[0], end: parts[1]});
    }

    ranges = ranges.sort((a, b) => a.start - b.start);

    let test = 0;
    let index = 0;
    let clear = false;

    while(ranges[index].start <= test) {
        test = Math.max(test, ranges[index].end + 1);
        index++;
    }
    
    console.log(test);
});