let lib = require('../../lib');

let year = 2024;
let day = 18;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let deltas = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
    ];

    for(let i = 0; i < 1024; i++) {
        let line = lines[i];
        let parts = line.split(',');
        grid[parts[0]] ||= [];
        grid[parts[0]][parts[1]] = true;
    }
    let exitX = 70;
    let exitY = 70;

    let currentIndex = 1024;

    while(true)
    {
        currentIndex++;
        let currentLine = lines[currentIndex];
        let parts = currentLine.split(',');
        grid[parts[0]][parts[1]] = true;

        let queue = new lib.linkedList();

        queue.push({ x: 0 , y: 0 });

        let visited = {};
        let finished = false;

        while(queue.any())
        {
            let current = queue.shift();
            let state = `${current.x},${current.y}`
            if(!visited[state] && !finished) {
                //console.log('non-visited', current);
                visited[state] = true;
                for(let delta of deltas) {
                    let x = current.x + delta.x;
                    let y = current.y + delta.y;
                    if(x === exitX && y === exitY) {
                        finished = true;
                    }
                    if(x >= 0 && y >= 0 && x <= exitX && y <= exitY && !grid[x][y]) {
                        //console.log('pushing', { x, y, count });
                        queue.push({ x, y });
                    }
                }
            }
        }

        if(!finished) {
            console.log(currentLine);
            process.exit(0);
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});