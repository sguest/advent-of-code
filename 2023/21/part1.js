let lib = require('../../lib');

let year = 2023;
let day = 21;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let startX, startY;
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            if(lines[y][x] === 'S') {
                startX = x;
                startY = y;
            }
        }
    }

    let queue = new lib.linkedList();
    queue.push({ x: startX, y: startY, steps: 0 });

    let deltas = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
    ];

    let visited = {};
    let count = 0;
    while(queue.length) {
        let current = queue.shift();
        let key = `${current.x},${current.y}`;

        if(!visited[key]) {
            visited[key] = true;

            if(current.steps % 2 === 0) {
                count++;
            }
            if(current.steps < 64) {
                for(let delta of deltas) {
                    let targetX = current.x + delta.x;
                    let targetY = current.y + delta.y;
                    
                    if(targetX >= 0 && targetY >= 0 && targetX < lines[0].length && targetY < lines.length && lines[targetY][targetX] !== '#')  {
                        queue.push({ x: targetX, y: targetY, steps: current.steps + 1 });
                    }
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});