let lib = require('../../lib');
let { PriorityQueue } = require('@datastructures-js/priority-queue');

let year = 2018;
let day = 23;

// Adapted from https://www.reddit.com/r/adventofcode/comments/a8s17l/2018_day_23_solutions/ecfmpy0/?utm_source=reddit&utm_medium=web2x&context=3
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
    let maxCoordinate = Math.max(...[minX, maxX, minY, maxY, minZ, maxZ].map(Math.abs));

    let searchDistance = 1;
    while(searchDistance < maxCoordinate) {
        searchDistance *= 2;
    }

    let queue = new PriorityQueue((a, b) => b.numBots - a.numBots || b.searchSize - a.searchSize || a.distance - b.distance);
    queue.enqueue({
        numBots: bots.length,
        searchSize: 2 * searchDistance,
        distance: 3 * searchDistance,
        minX: -searchDistance,
        minY: -searchDistance,
        minZ: -searchDistance,
    });

    let deltas = [];

    for(let x of [0, 1]) {
        for(let y of [0, 1]) {
            for(let z of [0, 1]) {
                deltas.push({x, y, z});
            }
        }
    }

    while(!queue.isEmpty()) {
        let current = queue.dequeue();

        if(current.searchSize === 1) {
            console.log(current.distance);
            break;
        }

        let newSize = current.searchSize / 2;

        for(let delta of deltas) {
            let minX = current.minX + newSize * delta.x;
            let minY = current.minY + newSize * delta.y;
            let minZ = current.minZ + newSize * delta.z;
            let maxX = minX + newSize - 1;
            let maxY = minY + newSize - 1;
            let maxZ = minZ + newSize - 1;

            let numBots = bots.filter(bot => {
                let distance = 0;
                if(bot.x < minX) {
                    distance += minX - bot.x;
                }
                else if(bot.x > maxX) {
                    distance += bot.x - maxX;
                }
                if(bot.y < minY) {
                    distance += minY - bot.y;
                }
                else if(bot.y > maxY) {
                    distance += bot.y - maxY;
                }
                if(bot.z < minZ) {
                    distance += minZ - bot.z;
                }
                else if(bot.z > maxZ) {
                    distance += bot.z - maxZ;
                }
                return (distance <= bot.range);
            }).length;

            let distance = Math.abs(minX) + Math.abs(minY) + Math.abs(minZ);

            queue.enqueue({
                numBots,
                searchSize: newSize,
                distance,
                minX,
                minY,
                minZ,
            })
        }
    }
}).catch((err) => {
    console.log(err.stack);
});