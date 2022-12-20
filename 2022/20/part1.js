let lib = require('../../lib');

let year = 2022;
let day = 20;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let queue = new lib.linkedList();
    let original = new lib.linkedList();
    for(let line of lines) {
        let value = +line
        let node = queue.push(value);
        original.push(node);
    }

    for(let node of original) {
        let value = node.value;
        let current = node;
        if(value !== 0) {
            queue.removeNode(node);
            let steps = value % queue.length;
            if(steps > 0) {
                for(let i = 0; i < steps; i++) {
                    current = queue.nextNode(current, true);
                }
            }
            else {
                for(let i = 0; i < Math.abs(steps) + 1; i++) {
                    current = queue.prevNode(current, true);
                }
            }
            queue.insertAfter(current, value);
        }
    }

    let currentNode = queue.head;
    while(currentNode.value !== 0) {
        currentNode = queue.nextNode(currentNode);
    }

    let sum = 0;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 1000; j++) {
            currentNode = queue.nextNode(currentNode, true);
        }
        sum += currentNode.value;
    }

    console.log(sum);

}).catch((err) => {
    console.log(err, err.stack);
});