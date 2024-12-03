let lib = require('../../lib');

let year = 2023;
let day = 18;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let x = 0;
    let y = 0;
    let grid = [[true]];
    let deltas = {
        R: {x: 1, y: 0},
        L: {x: -1, y: 0},
        U: {x: 0, y: -1},
        D: {x: 0, y: 1},
    }
    let count = 1;
    for(let line of lines) {
        let [dir, num] = line.split(' ');
        num = +num;
        let delta = deltas[dir];
        for(let i = 0; i < num; i++) {
            x += delta.x;
            y += delta.y;
            grid[x] ||= [];
            if(!grid[x][y]) {
                count++;
            }
            grid[x][y] = true;
        }
    }

    let visited = {};

    let queue = [{x: 1, y: 1}];
    while(queue.length) {
        let current = queue.pop();
        let key = `${current.x},${current.y}`;
        if(!visited[key])
        {
            visited[key] = true;
            count++;
            for(let dir in deltas) {
                let delta = deltas[dir];
                let target = { x: current.x + delta.x, y: current.y + delta.y};
                if(!grid[target.x][target.y]) {
                    queue.push(target);
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});