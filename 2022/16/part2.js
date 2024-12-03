let lib = require('../../lib');
let Combinatorics = require('js-combinatorics');

let year = 2022;
let day = 16;

/*
    This solution uses a technique found here
    https://www.reddit.com/r/adventofcode/comments/zn6k1l/comment/j1xsxd2/?utm_source=share&utm_medium=web2x&context=3
    The technique splits the input into 2 equal size lists and solves each one independently, and then runs each pair
    of possible lists together, and takes the largest total size. I'm not convinced this works for every possible case
    (for example it seems to slightly under-state the sample input) but it gives the correct answer and it's good enough
    for me, for now at least
 */

let valves = { AA: { rate: 0, distances: {} } };

function findBest(targets) {
    let start = { at: 'AA', time: 27, released: 0, opened: [] };
    let best = 0;
    let bestAt = {};

    let queue = new lib.linkedList();
    queue.push(start);

    while(queue.any()) {
        let current = queue.shift();
        let newOpened = [...current.opened];
        newOpened.push(current.at);
        newOpened.sort();
        let identifier = newOpened.join(',');
        let valve = valves[current.at];
        let released = current.released + valve.rate * (current.time - 1);
        if(current.time > 0 && (!bestAt[identifier] || bestAt[identifier] < released)) {
            bestAt[identifier] = released;
            best = Math.max(best, released);

            for(let target of targets) {
                if(!current.opened.includes(target)) {
                    queue.push({ at: target, time: current.time - valve.distances[target] - 1, released, opened: newOpened });
                }
            }
        }
    }

    return best;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let paths = {};
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

    let len1 = Math.floor(targets.length / 2);
    let len2 = targets.length - len1;

    let comb1 = Combinatorics.combination(targets, len1);
    let list1 = [];
    let x;
    while(x = comb1.next()) {
        list1.push(x);
    }
    let comb2 = Combinatorics.combination(targets, len2);
    let list2 = [];
    while(x = comb2.next()) {
        list2.push(x);
    }

    let best = 0;

    for(let path1 of list1) {
        for(let path2 of list2) {
            if(path1.some(x => path2.indexOf(x) !== -1)) {
                continue;
            }

            let amount = findBest(path1) + findBest(path2);
            best = Math.max(best, amount);
        }
    }

    console.log(best);
}).catch((err) => {
    console.log(err, err.stack);
});