let lib = require('../../lib');

let year = 2021;
let day = 15;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];
    let width = lines.length;
    let height = lines[0].length;

    for(let x = 0; x < lines.length; x++) {
        let line = lines[x];
        grid[x] = [];
        grid[x + width] = [];
        grid[x + width * 2] = [];
        grid[x + width * 3] = [];
        grid[x + width * 4] = [];
        for(let y = 0; y < line.length; y++) {
            for(let xMult = 0; xMult < 5; xMult++) {
                for(let yMult = 0; yMult < 5; yMult++) {
                    let value = +line[y] + xMult + yMult;
                    while(value > 9) {
                        value -= 9;
                    }

                    grid[x + width * xMult][y + height * yMult] = value;
                }
            }
        }
    }

    let endX = width * 5 - 1;
    let endY = height * 5 - 1;

    let bestRisk = {'0,0': 0};

    let queue = new lib.linkedList();
    queue.push({x: 0, y: 0, risk: 0});

    let deltas = [{x: -1, y: 0}, {x: 1, y: 0}, {x:0, y: -1}, {x: 0, y: 1}];
    while(queue.any()) {
        let minRisk = Infinity;
        let bestNode;
        for(let node of queue.getNodes()){
            if(node.value.risk <= minRisk) {
                bestNode = node;
                minRisk = node.value.risk;
            }
        }

        queue.removeNode(bestNode);
        let current = bestNode.value;

        for(let delta of deltas) {
            let targetX = current.x + delta.x;
            let targetY = current.y + delta.y;

            if(targetX === endX && targetY === endY) {
                console.log(current.risk + grid[targetX][targetY]);
                process.exit(0);
            }

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
}).catch((err) => {
    console.log(err, err.stack);
});