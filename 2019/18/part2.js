let lib = require('../../lib');

let year = 2019;
let day = 18;

//To speed this up, probably need to calculate the distances between each key pair
//(and distance from start to each key) and then use those to pathfind.
lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let y = 0;
    let keyCount = 0;
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
                    keyCount++;
                }
            }
            x++;
        }
        y++;
    }

    let deltas = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];

    grid[start.x][start.y] = false;
    for(let delta of deltas) {
        grid[start.x + delta.x][start.y + delta.y] = false;
    }

    let bots = [
        {x: start.x - 1, y: start.y - 1},
        {x: start.x + 1, y: start.y - 1},
        {x: start.x - 1, y: start.y + 1},
        {x: start.x + 1, y: start.y + 1}
    ];

    let queue = new lib.linkedList();
    for(let index = 0; index < bots.length; index++) {
        queue.push({bots: bots.map(bot => { return {x: bot.x, y: bot.y} }), keys: [], steps: 0, lastBotIndex: index});
    }

    let visited = {};

    main: while(queue.length) {
        let current = queue.shift();

        let lastBot = current.bots[current.lastBotIndex];

        if(!grid[lastBot.x][lastBot.y]) {
            continue main;
        }

        let keys = current.keys;

        let keyString = keys.join('');

        visited[keyString] = visited[keyString] || {};

        let position = current.bots.map(bot => bot.x + ',' + bot.y).join(',');

        if(visited[keyString][position]) {
            continue main;
        }

        visited[keyString][position] = true;

        let canSwitchBots = false;

        if(grid[lastBot.x][lastBot.y] !== true) {
            let char = grid[lastBot.x][lastBot.y];

            if(char === char.toLowerCase()) {
                let key = char;
                if(current.keys.indexOf(key) === -1) {
                    canSwitchBots = true;
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

        for(let botIndex = 0; botIndex < current.bots.length; botIndex++) {
            if(canSwitchBots || botIndex === current.lastBotIndex) {
                for(let delta of deltas) {
                    let newBots = current.bots.map(bot => { return {x: bot.x, y: bot.y} });
                    newBots[botIndex].x += delta.x;
                    newBots[botIndex].y += delta.y;
                    queue.push({bots: newBots, keys, steps: current.steps + 1, lastBotIndex: botIndex});
                }
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});