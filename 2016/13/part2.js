const lib = require('../../lib');

lib.getInput(2016, 13).then((data) => {
    let input = +data;

    let visited = {};
    let queue = [{steps: 0, x: 1, y: 1}];
    let visitedCount = 0;

    while(queue.length) {
        let current = queue.pop();

        let state = current.x + ',' + current.y;
        if(visited[state]) {
            continue;
        }
        visited[state] = true;

        if(current.x < 0 || current.y < 0) {
            continue;
        }

        let num = current.x * current.x + 3 * current.x + 2 * current.x * current.y + current.y + current.y * current.y;
        num += input;

        let isWall = false;

        while(num > 0) {
            if(num % 2) {
                isWall = !isWall;
            }
            num = Math.floor(num / 2);
        }

        if(isWall) {
            continue;
        }

        if(current.steps > 50) {
            continue;
        }

        visitedCount++;    

        for(let x of [current.x - 1, current.x + 1]) {
            queue.unshift({steps: current.steps + 1, x: x, y: current.y});
        }

        for(let y of [current.y - 1, current.y + 1]) {
            queue.unshift({steps: current.steps + 1, x: current.x, y: y});
        }
    }

    console.log(visitedCount);
});