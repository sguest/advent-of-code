let lib = require('../../lib');

let year = 2021;
let day = 12;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let caves = {};
    for(let line of lines) {
        let parts = line.split('-');
        caves[parts[0]] = caves[parts[0]] || [];
        caves[parts[1]] = caves[parts[1]] || [];
        caves[parts[0]].push(parts[1]);
        caves[parts[1]].push(parts[0]);
    }

    let queue = new lib.linkedList();
    queue.push({ at: 'start', visited: [] });

    let count = 0;
    while(queue.any()) {
        let current = queue.shift();
        if(current.at === 'end') {
            count++;
        }
        else {
            let cave = caves[current.at];

            for(let exit of cave) {
                if(exit !== 'start' && current.visited.indexOf(exit) === -1) {
                    let visited = current.visited.slice(0);
                    if(exit.toLowerCase() === exit) {
                        visited.push(exit);
                    }
                    queue.push({ at: exit, visited });
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});