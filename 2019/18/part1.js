let lib = require('../../lib');

let year = 2019;
let day = 18;

// could speed this up by bringing over the pre-computed paths from part 2.
lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let y = 0;
    let start;
    let keyCount = 0;
    for(let line of lines) {
        let x = 0;
        for(let char of line) {
            grid[x] = grid[x] || [];
            grid[x][y] = (char !== '#');

            if(char === '@') {
                start = {x, y};
            }
            else if(char !== '.' && char !== '#') {
                grid[x][y] = char;
                if(char === char.toLowerCase()) {
                    keyCount++;
                }
            }
            x++;
        }
        y++;
    }

    let queue = new lib.linkedList();
    queue.push({x: start.x, y: start.y, keys: [], steps: 0});
    
    let visited = {};

    main: while(queue.length) {
        let current = queue.shift();

        if(!grid[current.x][current.y]) {
            continue main;
        }

        let keys = current.keys;

        let keyString = keys.join('');

        visited[keyString] = visited[keyString] || {};

        let position = current.x + ',' + current.y;

        if(visited[keyString][position]) {
            continue main;
        }

        visited[keyString][position] = true;

        if(grid[current.x][current.y] !== true) {
            let char = grid[current.x][current.y];

            if(char === char.toLowerCase()) {
                let key = char;
                if(current.keys.indexOf(key) === -1) {
                    keys = current.keys.slice(0);
                    keys.push(key);
                    keys = keys.sort();

                    if(keys.length === keyCount) {
                        console.log(current.steps);
                        process.exit(0);
                    }
                }
            }
            else {
                let door = char;
                if(keys.indexOf(door.toLowerCase()) === -1) {
                    continue main;
                }
            }
        }

        queue.push({x: current.x - 1, y: current.y, keys, steps: current.steps + 1});
        queue.push({x: current.x + 1, y: current.y, keys, steps: current.steps + 1});
        queue.push({x: current.x, y: current.y - 1, keys, steps: current.steps + 1});
        queue.push({x: current.x, y: current.y + 1, keys, steps: current.steps + 1});
    }
}).catch((err) => {
    console.log(err, err.stack);
});