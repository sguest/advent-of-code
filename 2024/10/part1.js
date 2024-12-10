let lib = require('../../lib');

let year = 2024;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];

    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++)
        {
            grid[x] ||= [];
            grid[x][y] = +line[x];
        }
    }

    let width = lines[0].length;
    let height = lines.length;

    let sum = 0;

    let deltas = [
        {x: 0, y: 1},
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: -1, y: 0}
    ]

    for(let x = 0; x < width; x++)
    {
        for(let y = 0; y < height; y++)
        {
            if(grid[x][y] === 0)
            {
                let queue = [{x, y, height: 0}];
                let currentScore = 0;
                let destinations = [];

                while(queue.length)
                {
                    let current = queue.pop();
                    for(let delta of deltas)
                    {
                        let targetX = current.x + delta.x;
                        let targetY = current.y + delta.y;
                        let targetHeight = grid[targetX] && grid[targetX][targetY];
                        if(targetHeight === current.height + 1)
                        {
                            if(targetHeight === 9)
                            {
                                destinations[targetX] ||= [];
                                if(!destinations[targetX][targetY])
                                {
                                    destinations[targetX][targetY] = true;
                                    currentScore++;
                                }
                            }
                            else
                            {
                                queue.push({ x: targetX, y: targetY, height: targetHeight});
                            }
                        }
                    }
                }
                sum += currentScore;
            }
        }
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});