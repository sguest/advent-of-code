let lib = require('../../lib');

let year = 2020;
let day = 23;

lib.getInput(year, day).then((data) => {
    let list = new lib.linkedList();
    let length = data.length;
    let lookup = new Map();
    let current = list.push(+data[0]);
    lookup.set(+data[0], current);
    for(let i = 1; i < length; i++) {
        let newNode = list.push(+data[i]);
        lookup.set(+data[i], newNode);
    }

    for(let i = length + 1; i <= 1000000; i++) {
        let newNode = list.push(i);
        lookup.set(i, newNode);
    }
    length = 1000000;

    for(let move = 0; move < 10000000; move++) {
        let removedValues = [];
        for(let i = 0; i < 3; i++) {
            let nextNode = list.nextNode(current, true);
            removedValues.push(nextNode.value);
            list.removeNode(nextNode);
        }
        let target = current.value;
        do {
            target = (target + length - 2) % length + 1;
        } while (removedValues.indexOf(target) !== -1)

        let destination = lookup.get(target);

        removedValues.reverse().forEach(value => {
            let newNode = list.insertAfter(destination, value);
            lookup.set(value, newNode);
        });

        current = list.nextNode(current, true);
    }

    current = lookup.get(1);
    current = list.nextNode(current, true);
    let val1 = current.value;
    current = list.nextNode(current, true);
    let val2 = current.value;

    console.log(val1 * val2);
}).catch((err) => {
    console.log(err, err.stack);
});