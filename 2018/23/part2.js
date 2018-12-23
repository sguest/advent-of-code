let lib = require('../../lib');

let year = 2018;
let day = 23;

// shamelessly stolen from https://www.reddit.com/r/adventofcode/comments/a8s17l/2018_day_23_solutions/ecerldd/

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let bots = [];
    for(let line of lines) {
        let parsed = /pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)/.exec(line);
        let newBot = {x: +parsed[1], y: +parsed[2], z: +parsed[3], range: +parsed[4]};
        bots.push(newBot);
    }

    let xs = bots.map(b => b.x)
    xs.push(0);
    let ys = bots.map(b => b.y);
    ys.push(0);
    let zs = bots.map(b => b.z);
    zs.push(0);

    let dist = 1;
    while(dist < Math.max(...xs) - Math.min(...xs)) {
        dist *= 2;
    }

    while(true) {
        let targetCount = 0;
        let best;
        let bestVal;

        for(let x = Math.min(...xs); x <= Math.max(...xs) + 1; x += dist) {
            for(let y = Math.min(...ys); y <= Math.max(...ys) + 1; y += dist) {
                for(let z = Math.min(...zs); z <= Math.max(...zs) + 1; z += dist) {
                    let count = 0;
                    for(let bot of bots) {
                        let calc = Math.abs(x - bot.x) + Math.abs(y - bot.y) + Math.abs(z - bot.z)
                        if(Math.floor((calc - bot.range) / dist) <= 0) {
                            count++;
                        }
                    }

                    if(count > targetCount) {
                        targetCount = count;
                        bestVal = Math.abs(x) + Math.abs(y) + Math.abs(z);
                        best = { x, y, z };
                    }
                    else if(count === targetCount) {
                        if(!bestVal || Math.abs(x) + Math.abs(y) + Math.abs(z) < bestVal) {
                            bestVal = Math.abs(x) + Math.abs(y) + Math.abs(z);
                            best = { x, y, z };
                        }
                    }
                }
            }
        }

        if(dist === 1) {
            console.log(bestVal);
            break;
        }
        else {
            xs = [best.x - dist, best.x + dist];
            ys = [best.y - dist, best.y + dist];
            zs = [best.z - dist, best.z + dist];
            dist = Math.floor(dist / 2);
        }
    }
}).catch((err) => {
    console.log(err.stack);
});