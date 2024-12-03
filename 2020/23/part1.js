let lib = require('../../lib');

let year = 2020;
let day = 23;

lib.getInput(year, day).then((data) => {
    let list = new lib.linkedList();
    let length = data.length;
    let current = list.push(+data[0]);
    for(let i = 1; i < length; i++) {
        list.push(+data[i]);
    }

    for(let move = 0; move < 100; move++) {
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

        let destination = current;
        while(destination.value !== target) {
            destination = list.nextNode(destination, true);
        }

        removedValues.reverse().forEach(value => {
            list.insertAfter(destination, value);
        });

        current = list.nextNode(current, true);
    }

    while(current.value !== 1) {
        current = list.nextNode(current, true);
    }

    current = list.nextNode(current, true);
    let result = '';
    while(current.value !== 1) {
        result += current.value;
        current = list.nextNode(current, true);
    }

    console.log(result);
}).catch((err) => {
    console.log(err, err.stack);
});