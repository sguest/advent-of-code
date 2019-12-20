let lib = require('../../lib');

let year = 2019;
let day = 20;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let y = 0;
    let deltas = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];
    let portalEnds = {};
    for(let line of lines) {
        for(let x = 0; x < line.length; x++) {
            let char = line[x];
            grid[x] = grid[x] || [];

            if(char === '#' || char === '.') {
                grid[x][y] = char
            }
            else if(char === ' ') {
                grid[x][y] = '#';
            }
            else {
                let pairFound = false;
                for(let delta of deltas) {
                    let deltaX = x + delta.x;
                    let deltaY = y + delta.y;
                    grid[deltaX] = grid[deltaX] || [];
                    let otherChar = grid[deltaX][deltaY];
                    if(/[A-Z]/.test(otherChar)) {
                        pairFound = true;
                        let portal = [char,otherChar].sort().join('');
                        grid[x][y] = portal;
                        grid[deltaX][deltaY] = portal;
                        portalEnds[portal] = portalEnds[portal] || [];
                        portalEnds[portal].push({x, y}, {x: deltaX, y: deltaY});
                    }
                }
                if(!pairFound) {
                    grid[x][y] = char;
                }
            }
        }
        y++;
    }

    let pos;
    outer: for(let x = 0; x < grid.length; x++) {
        for(let y = 0; y < grid[x].length; y++) {
            if(grid[x][y] === 'AA') {
                for(let delta of deltas) {
                    if(grid[x + delta.x][y + delta.y] === '.') {
                        pos = {x:x + delta.x, y:y + delta.y};
                        break outer;
                    }
                }
            }
        }
    }

    let portals = {}

    for(let portal in portalEnds) {
        let ends = portalEnds[portal];

        let realEnds = [];
        for(let end of ends) {
            for(let delta of deltas) {
                if(grid[end.x + delta.x][end.y + delta.y] === '.') {
                    realEnds.push(end);
                }
            }
        }

        if(realEnds.length === 2) {
            portals[portal] = {}
            portals[portal][realEnds[0].x + ',' + realEnds[0].y] = {x: realEnds[1].x, y: realEnds[1].y};
            portals[portal][realEnds[1].x + ',' + realEnds[1].y] = {x: realEnds[0].x, y: realEnds[0].y};
        }
    }

    let queue = new lib.linkedList();

    queue.push({x: pos.x, y: pos.y, steps: 0});
    
    let visited = {};
    while(queue.length) {
        let current = queue.shift();

        if(visited[current.x + ',' + current.y]) {
            continue;
        }
        visited[current.x + ',' + current.y] = true;

        let char = grid[current.x][current.y];

        if(char === '#' || char === 'AA') {
            continue;
        }

        if(char === 'ZZ') {
            console.log(current.steps - 1);
            process.exit(0);
        }

        if(/[A-Z][A-Z]/.test(char)) {
            let portal = portals[char];

            let destination = portal[current.x + ',' + current.y];

            for(let delta of deltas) {
                if(grid[delta.x + destination.x][delta.y + destination.y] === '.') {
                    queue.push({x: delta.x + destination.x, y: delta.y + destination.y, steps: current.steps});
                }
            }
        }
        else {
            for(let delta of deltas) {
                queue.push({x: current.x + delta.x, y: current.y + delta.y, steps: current.steps + 1});
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});