let lib = require('../../lib');

let year = 2018;
let day = 20;

function parsePath(path) {
    let index = 0;
    let rootPath = '';

    while(/[NEWS]/.test(path[index])) {
        rootPath += path[index];
        index++;
    }

    index++;
    let nestedCount = 0;

    let currentBranch = '';
    let branches = [];

    branchLoop: while(index < path.length) {
        if(!path.length) {
            return { path: '', branches: [], next: null }
        }
        let char = path[index];

        if(nestedCount > 0) {
            currentBranch += char;
            if(char === ')') {
                nestedCount--;
            }
            else if(char === '(') {
                nestedCount++;
            }
        }
        else {
            if(char === '(') {
                currentBranch += char;
                nestedCount++;
            }
            else if(char === '|') {
                branches.push(parsePath(currentBranch));
                currentBranch = '';
            }
            else if(char === ')') {
                break branchLoop;
            }
            else {
                currentBranch += char;
            }    
        }

        index++;
    }

    if(currentBranch.length) {
        branches.push(parsePath(currentBranch));
    }

    let next = null;

    if(path.length > index + 1) {
        next = parsePath(path.substring(index + 1));
    }

    return {
        path: rootPath,
        branches,
        next
    }
}

let grid = [];

function addRoom(x, y) {
    let room = {x, y, exits: {} };
    grid[x] = grid[x] || [];
    grid[x][y] = room;
    return room;
}

function getRoom(x, y) {
    if(grid[x]) {
        return grid[x][y];
    }

    return undefined;
}

let delta = {
    N: {x: 0, y: -1},
    S: {x: 0, y: 1},
    E: {x: 1, y: 0},
    W: {x: -1, y: 0}
}

let inverse = {
    N: 'S',
    S: 'N',
    E: 'W',
    W: 'E'
}

function processPath(x, y, pathObject, next) {
    let currentRoom = getRoom(x, y);

    for(let char of pathObject.path) {
        x += delta[char].x;
        y += delta[char].y;

        let nextRoom = getRoom(x, y);
        if(!nextRoom) {
            nextRoom = addRoom(x, y);
        }

        currentRoom.exits[char] = nextRoom;
        nextRoom.exits[inverse[char]] = currentRoom;

        currentRoom = nextRoom;
    }

    for(let branch of pathObject.branches) {
        processPath(x, y, branch, pathObject.next);
    }

    if(next) {
        processPath(x, y, next, next.next);
    }
}

lib.getInput(year, day).then((data) => {
    data = data.substring(1, data.length - 1);

    let rootPath = parsePath(data);

    addRoom(0, 0);

    processPath(0, 0, rootPath, null);

    let path = [{ x: 0, y: 0, steps: 0 }];
    let visited = {};
    let count = 0;

    while(path.length) {
        let current = path.shift();

        let id = current.x + ',' + current.y;

        if(!visited[id]) {
            visited[id] = true;
            if(current.steps >= 1000) {
                count++;
            }

            let currentRoom = getRoom(current.x, current.y);

            for(let dir in currentRoom.exits) {
                path.push({ x: current.x + delta[dir].x, y: current.y + delta[dir].y, steps: current.steps + 1});
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err.stack);
});