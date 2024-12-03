let lib = require('../../lib');

let year = 2021;
let day = 15;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    for(let line of lines) {
        grid.push(line.split('').map(x => +x));
    }
    let endX = lines.length - 1;
    let endY = lines[0].length - 1;

    let bestRisk = {'0,0': 0};

    let queue = new lib.linkedList();
    queue.push({x: 0, y: 0, risk: 0});

    let deltas = [{x: 1, y: 0}, {x: 0, y: 1}];
    while(queue.any()) {
        let current = queue.shift();

        for(let delta of deltas) {
            let targetX = current.x + delta.x;
            let targetY = current.y + delta.y;

            let targetId = targetX + ',' + targetY;
            if(grid[targetX] && grid[targetX][targetY]) {
                let newRisk = current.risk + grid[targetX][targetY];
                if(bestRisk[targetId] === undefined || bestRisk[targetId] > newRisk) {
                    bestRisk[targetId] = newRisk;
                    queue.push({x: targetX, y: targetY, risk: newRisk });
                }
            }
        }
    }

    console.log(bestRisk[endX + ',' + endY]);
}).catch((err) => {
    console.log(err, err.stack);
});