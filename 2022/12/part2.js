let lib = require('../../lib');

let year = 2022;
let day = 12;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let y = 0;
    let startHeight = 'a'.charCodeAt(0);
    for(let line of lines) {
        grid.push(line.split('').map(x => x.charCodeAt(0)));
        for(let x = 0; x < line.length; x++) {
            if(line[x] === 'S') {
                grid[y][x] = startHeight;
            }
            else if(line[x] === 'E') {
                end = { x, y };
            }
        }
        y++;
    }

    let queue = new lib.linkedList();
    queue.push({ ...end, steps: 0, height: 122 });
    let deltas = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
    let visited = {};

    while(queue.length) {
        let current = queue.shift();
        let marker = `${current.x},${current.y}`;
        if(!visited[marker]) {
            visited[marker] = true;
            for(let delta of deltas) {
                let target = { x: current.x + delta.x, y: current.y + delta.y };
                if(grid[target.y] && grid[target.y][target.x]) {
                    let targetHeight = grid[target.y][target.x];
                    if(targetHeight === startHeight && current.height === startHeight + 1) {
                        console.log(current.steps + 1);
                        process.exit(0);
                    }

                    if(targetHeight >= current.height - 1) {
                        queue.push({ ...target, height: targetHeight, steps: current.steps + 1});
                    }
                }
            }
        }
    }

}).catch((err) => {
    console.log(err, err.stack);
});