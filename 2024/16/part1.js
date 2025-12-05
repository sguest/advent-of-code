let lib = require('../../lib');

let year = 2024;
let day = 16;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let start;
    let end;

    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            if(lines[y][x] === 'S') {
                start = { x, y };
            }
            else if(lines[y][x] === 'E') {
                end = { x, y };
            }
        }
    }

    let startState = { x: start.x, y: start.y, facing: 'E', score: 0 };

    let deltas = {
        E: { x: 1, y: 0 },
        W: { x: -1, y: 0 },
        N: { x: 0, y: -1 },
        S: { x: 0, y: 1 },
    };

    let rotations = {
        E: ['N', 'S'],
        W: ['N', 'S'],
        N: ['E', 'W'],
        S: ['E', 'W'],
    }

    let options = [startState];
    let visited = {};
    let bestFinish = 999999999999999;

    while(options.length) {
        let current = options.pop();
        if(current.score <= bestFinish && lines[current.y][current.x] !== '#')
        {
            let state = `${current.x},${current.y},${current.facing}`;
            let best = visited[state] ?? 9999999999999;
            if(best >= current.score)
            {
                visited[state] = current.score;

                if(end.x === current.x && end.y === current.y) {
                    bestFinish = Math.min(current.score, bestFinish);
                }
                else
                {
                    let delta = deltas[current.facing];
                    let rots = rotations[current.facing];

                    for(let newFacing of rots) {
                        const front = { x: current.x + deltas[newFacing].x, y: current.y + deltas[newFacing].y};
                        if(lines[front.y][front.x] !== '#')
                        {
                            options.push({ x: current.x, y: current.y, facing: newFacing, score: current.score + 1000 });
                        }
                    }

                    let stopped = false;
                    let target = { x: current.x + delta.x, y: current.y + delta.y };

                    if(lines[target.y][target.x] !== '#') {
                        let targetScore = current.score + 1;

                        while(!stopped)
                        {
                            let adjacentEmpty = false;
                            for(let rot of rots) {
                                let delta = deltas[rot];
                                if(lines[target.y + delta.y][target.x + delta.x] !== '#')
                                {
                                    adjacentEmpty = true;
                                }
                            }
                            if(adjacentEmpty) {
                                stopped = true;
                            }
                            else 
                            {
                                let newTarget = { x: target.x + delta.x, y: target.y + delta.y };
                                if(lines[newTarget.y][newTarget.x] === '#')
                                {
                                    stopped = true;
                                }
                                else
                                {
                                    target = newTarget;
                                    targetScore++;
                                }
                            }
                        }
                        if(target.x !== current.x || target.y !== current.y) {
                            options.push({ x: target.x, y: target.y, facing: current.facing, score: targetScore });
                        }
                    }
                }
            }
        }
    }

    console.log(bestFinish);
}).catch((err) => {
    console.log(err, err.stack);
});