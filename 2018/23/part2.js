let lib = require('../../lib');

let year = 2018;
let day = 23;

// shamelessly stolen and adapted from https://www.reddit.com/r/adventofcode/comments/a8s17l/2018_day_23_solutions/ecerldd/

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let bots = [];
    for(let line of lines) {
        let parsed = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/.exec(line);
        let newBot = {x: +parsed[1], y: +parsed[2], z: +parsed[3], range: +parsed[4]};
        bots.push(newBot);
    }

    let minX = Math.min(...bots.map(b => b.x), 0);
    let maxX = Math.max(...bots.map(b => b.x), 0);
    let minY = Math.min(...bots.map(b => b.y), 0);
    let maxY = Math.max(...bots.map(b => b.y), 0);
    let minZ = Math.min(...bots.map(b => b.z), 0);
    let maxZ = Math.max(...bots.map(b => b.z), 0);

    let searchDistance = 1;
    while(searchDistance < maxX - minX) {
        searchDistance *= 2;
    }

    while(true) {
        let bestCount = 0;
        let bestLocation;
        let bestDistance = Infinity;

        for(let x = minX; x <= maxX + 1; x += searchDistance) {
            for(let y = minY; y <= maxY + 1; y += searchDistance) {
                for(let z = minZ; z <= maxZ + 1; z += searchDistance) {
                    let count = 0;
                    for(let bot of bots) {
                        let botDistance = Math.abs(x - bot.x) + Math.abs(y - bot.y) + Math.abs(z - bot.z)
                        if(botDistance - bot.range < searchDistance) {
                            count++;
                        }
                    }

                    let currentVal = Math.abs(x) + Math.abs(y) + Math.abs(z);
                    if(count > bestCount || (count === bestCount && currentVal < bestDistance)) {
                        bestCount = count;
                        bestDistance = currentVal;
                        bestLocation = { x, y, z };
                    }
                }
            }
        }

        if(searchDistance === 1) {
            console.log(bestDistance);
            break;
        }
        else {
            minX = bestLocation.x - searchDistance;
            maxX = bestLocation.x + searchDistance;
            minY = bestLocation.y - searchDistance;
            maxY = bestLocation.y + searchDistance;
            minZ = bestLocation.z - searchDistance;
            maxZ = bestLocation.z + searchDistance;
            searchDistance /= 2;
        }
    }
}).catch((err) => {
    console.log(err.stack);
});