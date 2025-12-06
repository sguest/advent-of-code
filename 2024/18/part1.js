let lib = require('../../lib');

let year = 2024;
let day = 18;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let i = 0; i < 1024; i++) {
        let line = lines[i];
        let parts = line.split(',');
        grid[parts[0]] ||= [];
        grid[parts[0]][parts[1]] = true;
    }
    let x = 0;
    let y = 0;
    let deltas = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ];
    let exitX = 70;
    let exitY = 70;

    let queue = new lib.linkedList();

    queue.push({ x, y, count: 0 });

    let visited = {};

    while(queue.any())
    {
        let current = queue.shift();
        let state = `${current.x},${current.y}`
        if(!visited[state]) {
            //console.log('non-visited', current);
            visited[state] = true;
            let count = current.count + 1;
            for(let delta of deltas) {
                let x = current.x + delta.x;
                let y = current.y + delta.y;
                if(x === exitX && y === exitY) {
                    console.log(count);
                    process.exit(0);
                }
                if(x >= 0 && y >= 0 && x <= exitX && y <= exitY && !grid[x][y]) {
                    //console.log('pushing', { x, y, count });
                    queue.push({ x, y, count });
                }
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});