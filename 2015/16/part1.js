let lib = require('../../lib');

let year = 2015;
let day = 16;

lib.getInput(year, day).then((data) => {
    let target = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    }

    let sues = [];

    for(let line of data.split('\n')) {
        line = line.replace(/^Sue \d+: /, '');
        let values = line.split(', ');
        let sue = {};
        for(let value of values) {
            let parts = value.split(': ');
            sue[parts[0]] = parseInt(parts[1], 10);
        }
        sues.push(sue);
    }

    main:
    for(let index = 0; index < sues.length; index++) {
        let sue = sues[index];
        for(let key in sue) {
            if(target[key] !== sue[key]) {
                continue main;
            }
        }
        console.log(index + 1);
        break;
    }
});