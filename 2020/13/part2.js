let lib = require('../../lib');

let year = 2020;
let day = 13;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let buses = [];
    let chars = lines[1].split(',');

    for(let i = 0; i < chars.length; i++) {
        if(chars[i] !== 'x') {
            buses.push({num: +chars[i], index: i});
        }
    }

    buses = buses.sort((a, b) => a.num - b.num);

    let current = buses[0].num - buses[0].index;
    let increment = buses[0].num;

    for(let i = 1; i < buses.length; i++) {
        while((current + buses[i].index) % buses[i].num !== 0) {
            current += increment;
        }
        increment *= buses[i].num;
    }

    console.log(current);
}).catch((err) => {
    console.log(err, err.stack);
});