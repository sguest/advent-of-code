let lib = require('../../lib');

let year = 2024;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let nodes = {};
    for(let y = 0; y < lines.length; y++)
    {
        let line = lines[y];
        for(let x = 0; x < line.length; x++)
        {
            let char = lines[y][x];
            if(char !== '.')
            {
                nodes[char] ||= [];
                nodes[char].push({ x, y });
            }
        }
    }

    let width = lines[0].length;
    let height = lines.length;
    let locations = [];
    let count = 0;

    const inBounds = (x, y) => {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    const checkPos = (x, y) => {
        locations[x] ||= [];
        if(!locations[x][y])
        {
            locations[x][y] = true;
            count++;
        }
    }

    for(let char in nodes)
    {
        let nodeList = nodes[char];
        for(let i = 0; i < nodeList.length - 1; i++)
        {
            for(let j = i + 1; j < nodeList.length; j++)
            {
                let dx = nodeList[i].x - nodeList[j].x;
                let dy = nodeList[i].y - nodeList[j].y;
                let gcd = Math.abs(lib.gcd(dx, dy));
                dx /= gcd;
                dy /= gcd;
                let x = nodeList[i].x;
                let y = nodeList[i].y;
                while(inBounds(x, y))
                {
                    checkPos(x, y);
                    x += dx;
                    y += dy;
                }
                x = nodeList[i].x - dx;
                y = nodeList[i].y - dy;
                while(inBounds(x, y))
                {
                    checkPos(x, y);
                    x -= dx;
                    y -= dy;
                }
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});