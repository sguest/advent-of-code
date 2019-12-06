let lib = require('../../lib');

let year = 2019;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let orbits = {};
    for(let line of lines) {
        let parts = line.split(')');
        let first = parts[0];
        let second = parts[1];
        orbits[first] = orbits[first] || [];
        orbits[first].push(second);
    }

    let root = {name: 'COM', children: []};

    let queue = [];
    for(let child of orbits['COM']) {
        queue.push({parent: root, name: child});
    }

    while(queue.length) {
        let current = queue.pop();
        let newNode = {name: current.name, children: []};
        current.parent.children.push(newNode);

        if(orbits[current.name]) {
            for(let child of orbits[current.name]) {
                queue.push({parent: newNode, name: child});
            }
        }
    }

    queue = [];
    queue.push({node: root, depth: 0});
    let total = 0;

    while(queue.length) {
        let current = queue.pop();
        let depth = current.depth;
        total += depth;
        depth++;

        for(let child of current.node.children) {
            queue.push({node: child, depth: depth});
        }
    }
    
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});