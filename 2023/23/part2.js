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
    let endKey;
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
                endKey = key;
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
                if(!nodes[current.from].find(n => n.to === key)) {
                    nodes[current.from].push({ to: key, distance: current.steps });
                }
                if(!nodes[key]) {
                    nodes[key] = [];
                    for(let exit of exits) {
                        queue.push({ ...exit, steps: 1, from: key });
                    }
                }
                if(!nodes[key].find(n => n.to === current.from)) {
                    nodes[key].push({ to: current.from, distance: current.steps });
                }
            }
        }
    }

    //console.log(nodes);
    //console.log('**********************')

    let secondLastKey;
    for(let key in nodes) {
        let endIndex = nodes[key].findIndex(n => n.to === endKey);
        if(endIndex >= 0) {
            nodes[key] = [nodes[key][endIndex]];
            secondLastKey = key;
        }
        else {
            nodes[key].sort((a, b) => b.distance - a.distance);
        }
    }

    // for(let key in nodes) {
    //     let secondLastIndex = nodes[key].findIndex(n => n.to === secondLastKey);
    //     if(secondLastIndex >= 0) {
    //         nodes[key] = [nodes[key][secondLastIndex]];
    //     }
    // }

    let visited = {};

    const getDistance = (at) => {
        if(at === endKey) {
            return 0;
        }

        let longest = 0;
        let node = nodes[at];

        visited[at] = true;

        for(let target of node) {
            if(!visited[node.to]) {
                longest = Math.max(longest, target.distance + getDistance(target.to));
            }
        }

        visited[at] = undefined;
    }

    console.log(getDistance('1,0'));

    // queue = new lib.linkedList();
    // queue.push({ at: start, atLabel: '1,0', steps: 0, visited: ['1,0'] });

    // let globalVisited = {};
    // let longest = 0;

    // let counter = 0;

    // while(queue.length) {
    //     counter++;
    //     if(counter % 100000 === 0) {
    //         console.log(counter);
    //     }
    //     let current = queue.pop();
    //     if(counter > 8300000) {
    //         console.log(current);
    //     }
    //     let globalKey = `${current.x},${current.y},${current.visited.join(',')}`;
    //     //let globalKey = `${current.x},${current.y}`;
    //     if(!globalVisited[globalKey] || globalVisited[globalKey] < current.steps) {
    //     // if(!globalVisited[globalKey]) {
    //         globalVisited[globalKey] = current.steps;
    //         //globalVisited[globalKey] = true;
    //         //console.log(current);

    //         if(current.at === end) {
    //             longest = Math.max(longest, current.steps);
    //             continue;
    //         }

    //         for(let target of current.at) {
    //             if(!current.visited.includes(target.to)) {
    //                 let newVisited = [...current.visited];
    //                 newVisited.push(target.to);
    //                 queue.push({ at: nodes[target.to], atLabel: target.to, steps: current.steps + target.distance, visited: newVisited });
    //             }
    //         }
    //     }
    // }

    //console.log(longest);
}).catch((err) => {
    console.log(err, err.stack);
});

// 6199 too low