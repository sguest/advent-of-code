let lib = require('../../lib');

let year = 2019;
let day = 18;

//To speed this up, probably need to calculate the distances between each key pair
//(and distance from start to each key) and then use those to pathfind.
lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let y = 0;
    let keys = [];
    let start;
    for(let line of lines) {
        let x = 0;
        for(let char of line) {
            grid[x] = grid[x] || [];
            grid[x][y] = (char !== '#');

            if(char === '@') {
                start = {x,y};
            }
            else if(char !== '.' && char !== '#') {
                grid[x][y] = char;
                if(char === char.toLowerCase()) {
                    keys.push({ char, x, y });
                }
            }
            x++;
        }
        y++;
    }

    let keyCount = keys.length;

    let deltas = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];

    grid[start.x][start.y] = false;
    for(let delta of deltas) {
        grid[start.x + delta.x][start.y + delta.y] = false;
    }

    let paths = {};

    let bots = [
        {x: start.x - 1, y: start.y - 1},
        {x: start.x + 1, y: start.y - 1},
        {x: start.x - 1, y: start.y + 1},
        {x: start.x + 1, y: start.y + 1}
    ];

    let targets = keys.slice(0);
    for(let i = 0; i < bots.length; i++) {
        targets.push({char: i + '', x: bots[i].x, y: bots[i].y});
    }

    for(let target of targets) {
        let currentPath = {};
        let queue = new lib.linkedList();
        queue.push({ x: target.x, y: target.y, steps: 0, doors: [], extraKeys: [] });
        let visited = {};

        while(queue.length) {
            let current = queue.shift();
            if(!grid[current.x][current.y]) {
                continue;
            }
            let doorString = current.doors.join('');

            let discriminator = `${current.x},${current.y},${doorString}`;
            if(visited[discriminator]) {
                continue;
            }
            visited[discriminator] = true;

            let doors = current.doors.slice(0);
            let extraKeys = current.extraKeys.slice(0);

            if(current.steps > 0) {
                if(grid[current.x][current.y] !== true) {
                    let char = grid[current.x][current.y];

                    if(char === char.toLowerCase()) {
                        if(char !== target.char) {
                            currentPath[char] = currentPath[char] || [];
                            currentPath[char].push({
                                steps: current.steps,
                                doors: doors.slice(0),
                                extraKeys: extraKeys.slice(0),
                            });
                            extraKeys.push(char);
                        }
                    }
                    else {
                        char = char.toLowerCase();
                        if(doors.indexOf(char) === -1) {
                            doors.push(char);
                            doors = doors.sort();
                        }
                    }
                }
            }

            for(let delta of deltas) {
                queue.push({
                    x: current.x + delta.x,
                    y: current.y + delta.y,
                    steps: current.steps + 1,
                    doors: doors.slice(0),
                    extraKeys: extraKeys.slice(0),
                })
            }
        }

        for(let target in currentPath) {
            currentPath[target] = currentPath[target].sort((a, b) => a.steps - b.steps);
        }
        paths[target.char] = currentPath;
    }

    let queues = [];
    queues[0] = new lib.linkedList();
    queues[0].push({bots: ['0', '1', '2', '3'], keys: []});

    let currentSteps = 0;

    let visited = {};

    while(true) {
        while(queues[currentSteps] && queues[currentSteps].length) {
            let current = queues[currentSteps].shift();

            if(current.keys.length === keyCount) {
                console.log(currentSteps);
                process.exit(0);
            }

            let keyString = current.keys.join('');
            if(visited[keyString]) {
                continue;
            }
            visited[keyString] = true;

            for(let botIndex in current.bots) {
                let bot = current.bots[botIndex];
                let botTargets = paths[bot];

                keys: for(let targetKey in botTargets) {
                    if(current.keys.indexOf(targetKey) === -1) {
                        paths: for(let path of botTargets[targetKey]) {
                            for(let door of path.doors) {
                                if(current.keys.indexOf(door) === -1) {
                                    continue paths;
                                }
                            }

                            let targetSteps = currentSteps + path.steps;
                            let targetKeys = current.keys.slice(0);
                            targetKeys.push(targetKey);
                            for(let key of path.extraKeys) {
                                if(targetKeys.indexOf(key) === -1) {
                                    targetKeys.push(key);
                                }
                            }
                            targetKeys = targetKeys.sort();
                            queues[targetSteps] = queues[targetSteps] || [];
                            let targetBots = current.bots.slice(0);
                            targetBots[botIndex] = targetKey;
                            queues[targetSteps].push({ bots: targetBots, keys: targetKeys });
                            continue keys;
                        }
                    }
                }
            }
        }

        queues[currentSteps] = null;

        currentSteps++;
    }
}).catch((err) => {
    console.log(err, err.stack);
});