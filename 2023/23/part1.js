let lib = require('../../lib');

let year = 2023;
let day = 23;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let deltas = {
        'v': { x: 0, y: 1 },
        '^': { x: 0, y: -1 },
        '>': { x: 1, y: 0 },
        '<': { x: -1, y: 0 },
    };
    let opposite = {
        'v': '^',
        '^': 'v',
        '<': '>',
        '>': '<',
    };

    let nodes = { '1,0': [] };
    let start = nodes['1,0'];
    let end;
    let queue = new lib.linkedList();
    queue.push({ x: 1, y: 1, steps: 1, dir: 'v', from: '1,0' });

    while(queue.length) {
        let current = queue.shift();

        let done = false;
        while(!done) {
            if(current.y === lines.length - 1) {
                let key = `${current.x},${current.y}`;
                nodes[key] = [];
                nodes[current.from].push({ to: key, distance: current.steps });
                end = nodes[key];
                done = true;
                continue;
            }

            let exits = [];
            for(let dir in deltas) {
                if(dir !== opposite[current.dir]) {
                    let delta = deltas[dir];
                    let target = { x: current.x + delta.x, y: current.y + delta.y };
                    if(lines[target.y][target.x] !== '#') {
                        exits.push({ ...target, dir });
                    }
                }
            }
            if(exits.length === 1) {
                current = { ...current, ...exits[0] };
                current.steps++;
            }
            else {
                done = true;
                let key = `${current.x},${current.y}`;
                nodes[current.from].push({ to: key, distance: current.steps });
                if(!nodes[key]) {
                    nodes[key] = [];
                    for(let exit of exits) {
                        let tile = lines[exit.y][exit.x];
                        if(tile === '.' || tile === exit.dir) {
                            queue.push({ ...exit, steps: 1, from: key });
                        }
                    }
                }
            }
        }
    }

    queue = new lib.linkedList();
    queue.push({ at: start, steps: 0 });

    let longest = 0;

    while(queue.length) {
        let current = queue.shift();

        if(current.at === end) {
            longest = Math.max(longest, current.steps);
            continue;
        }

        for(let target of current.at) {
            queue.push({ at: nodes[target.to], steps: current.steps + target.distance});
        }
    }

    console.log(longest);
}).catch((err) => {
    console.log(err, err.stack);
});