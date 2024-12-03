let lib = require('../../lib');

let year = 2022;
let day = 16;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let valves = {};
    for(let line of lines) {
        let parsed = /^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/.exec(line);
        valves[parsed[1]] = {
            rate: +parsed[2],
            tunnels: parsed[3].split(', '),
        };
    }

    let current = { at: 'AA', time: 30, released: 0, opened: [] };
    let queue = new lib.linkedList();
    queue.push(current);
    let best = 0;
    let visited = {};

    while(queue.any()) {
        current = queue.shift();
        let identifier = `${current.at},${current.opened.join(',')}`;
        if(current.time > 0 && !visited[identifier]) {
            visited[identifier] = true;
            let valve = valves[current.at];
            for(let tunnel of valve.tunnels) {
                queue.push({ at: tunnel, time: current.time - 1, released: current.released, opened: [...current.opened]});
            }
            if(valve.rate > 0 && current.time > 1 && !current.opened.includes(current.at)) {
                let released = current.released + valve.rate * (current.time - 1);
                for(let tunnel of valve.tunnels) {
                    queue.push({ at: tunnel, time: current.time -2, released, opened: [...current.opened, current.at]})
                }
            }
        }
        else {
            best = Math.max(best, current.released);
        }
    }

    console.log(best);
}).catch((err) => {
    console.log(err, err.stack);
});