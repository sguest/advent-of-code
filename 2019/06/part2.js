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

    let myLocation;
    let santaLocation;

    while(queue.length) {
        let current = queue.pop();
        let newNode = {name: current.name, children: [], parent: current.parent};
        current.parent.children.push(newNode);

        if(current.name === 'YOU') {
            myLocation = current.parent;
        }

        if(current.name === 'SAN') {
            santaLocation = current.parent;
        }

        if(orbits[current.name]) {
            for(let child of orbits[current.name]) {
                queue.push({parent: newNode, name: child});
            }
        }
    }

    queue = new lib.linkedList();
    queue.push({node: myLocation, steps: 0});

    let visited = {};

    while(queue.length) {
        let current = queue.shift();

        if(visited[current.node.name]) {
            continue;
        }

        visited[current.node.name] = true;

        if(current.node === santaLocation) {
            console.log(current.steps);
            break;
        }

        if(current.node.parent) {
            queue.push({node: current.node.parent, steps: current.steps + 1});
        }
        for(let child of current.node.children) {
            queue.push({node: child, steps: current.steps + 1});
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});