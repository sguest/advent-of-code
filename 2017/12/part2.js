let lib = require('../../lib');

let year = 2017;
let day = 12;

let remaining = [];

lib.getInput(year, day).then((data) => {
    let connections = {};

    for(let line of data.split('\n')) {
        let parts = line.split(' <->');
        let ends = parts[1].split(', ').map(x => parseInt(x));
        let start = parseInt(parts[0], 10);

        connections[start] = ends;

        remaining.push(start);
    }

    let count = 0;
    let found = {};
    
    while(remaining.length)
    {
        let queue = [];
        queue.push(remaining[0]);
        while(queue.length) {
            let current = queue.shift();
            if(!found[current]) {
                found[current] = true;
                queue.push(...connections[current]);
                remaining.splice(remaining.indexOf(current), 1);
            }
        }
        count++;
    }

    console.log(count);
});