let lib = require('../../lib');

let year = 2020;
let day = 23;

lib.getInput(year, day).then((data) => {
    let length = data.length;
    let lookup = new Map();
    for(let i = 0; i < length - 1; i++) {
        lookup.set(+data[i], +data[i + 1]);
    }

    lookup.set(+data[length - 1], length + 1);

    for(let i = length + 1; i < 1000000; i++) {
        lookup.set(i, i + 1);
    }
    length = 1000000;
    lookup.set(length, +data[0]);
    let current = +data[0];

    for(let move = 0; move < 10000000; move++) {
        let removed = current;
        let removedValues = [];
        for(let i = 0; i < 3; i++) {
            removed = lookup.get(removed);
            removedValues.push(removed);
        }
        let newCurrent = lookup.get(removed);
        lookup.set(current, newCurrent);
        let target = current;
        do {
            target = (target + length - 2) % length + 1;
        } while (removedValues.indexOf(target) !== -1)

        let next = lookup.get(target);
        removedValues.forEach(value => {
            lookup.set(target, value);
            target = value;
        });
        lookup.set(target, next)

        current = newCurrent;
    }

    let val1 = lookup.get(1);
    let val2 = lookup.get(val1);

    console.log(val1 * val2);
}).catch((err) => {
    console.log(err, err.stack);
});