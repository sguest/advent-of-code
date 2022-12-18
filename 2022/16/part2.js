let lib = require('../../lib');

let year = 2022;
let day = 16;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let paths = {};
    let valves = { AA: { rate: 0, distances: {} } };
    for(let line of lines) {
        let parsed = /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/.exec(line);
        let name = parsed[1];
        let rate = +parsed[2];
        paths[name] = {
            rate,
            tunnels: parsed[3].split(', '),
        };

        if(rate > 0) {
            valves[name] = { rate, distances: {} };
        }
    }

    for(let name in valves) {
        let valve = valves[name];
        let start = { name, distance: 0 };
        let queue = new lib.linkedList();
        queue.push(start);
        let visited = {};
        while(queue.any()) {
            let current = queue.shift();
            if(!visited[current.name]) {
                visited[current.name] = true;
                let path = paths[current.name];
                if(current.name !== name && path.rate > 0) {
                    valve.distances[current.name] = current.distance;
                }

                for(let target of path.tunnels) {
                    queue.push({ name: target, distance: current.distance + 1 });
                }
            }
        }
    }

    let targets = [];

    for(let name in valves) {
        if(valves[name].rate > 0) {
            targets.push(name);
        }
    }

    let start = { at: ['AA', 'AA'], distance: [0, 0], time: 26, released: 0, visited: [[], []], history: [[], []] };
    let queue = new lib.linkedList();
    queue.push(start);
    let best = 0;

    let bestByVisited = {};

    while(queue.any()) {
        let current = queue.shift();

        if(current.time > 0) {
            if(current.distance[0] > 0 && current.distance[1] > 0) {
                let minDistance = Math.min(...current.distance);
                queue.push({ ...current, distance: current.distance.map(d => d - minDistance), time: current.time - minDistance });
            }
            else {
                let allVisited = [...current.visited[0], ...current.visited[1]]
                for(let i = 0; i < 2; i++) {
                    let at = current.at[i]
                    if(current.distance[i] === 0 && !allVisited.includes(at)) {
                        let valve = valves[at];
                        let visited = [...current.visited];
                        if(at !== 'AA') {
                            visited[i] = [...visited[i], at];
                            visited[i].sort();
                        }
                        let released = current.released + valve.rate * current.time;
                        let identifier = visited.map(v => v.join(',')).join(':') + '-' + current.at[1 - i];
                        if(!visited[0].length || !visited[1].length || bestByVisited[identifier] === undefined || bestByVisited[identifier] < released) {
                            bestByVisited[identifier] = released;
                            if(released > best) {
                                console.log('========');
                                console.log(released);
                                console.log(current.history);
                            }
                            best = Math.max(best, released);
                            for(let t = 0; t < targets.length; t++) {
                                let target = targets[t];
                                if(!allVisited.includes(target)) {
                                    let skip = false;
                                    if(current.distance[1 - i] === 0) {
                                        skip = (t % 2 === i);
                                    }
                                    if(!skip) {
                                        let at = [...current.at];
                                        at[i] = target;
                                        let distance = [...current.distance];
                                        distance[i] = valve.distances[target] + 1;
                                        let history = [];
                                        history = [...current.history];
                                        history[i] = [...history[i], { from: current.at[i], to: target, time: current.time }]
                                        queue.push({ at, distance, released, visited, time: current.time, history })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log(best);
}).catch((err) => {
    console.log(err, err.stack);
});


// 1986 too low
// 2219 wrong