let lib = require('../../lib');

let year = 2017;
let day = 12;

let found = {0: true};

lib.getInput(year, day).then((data) => {
    let connections = {};

    for(let line of data.split('\n')) {
        let parts = line.split(' <->');
        let ends = parts[1].split(', ').map(x => parseInt(x));
        let start = parseInt(parts[0], 10);

        connections[start] = ends;
    }

    let queue = [];
    queue.push(connections[0]);
    let count = 1;

    while(queue.length) {
        let current = queue.shift();
        if(!found[current]) {
            found[current] = true;
            count++;
            queue.push(...connections[current]);
        }
    }

    console.log(count);
});