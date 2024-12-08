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

    const checkPos = (x, y) => {
        if(x >= 0 && x < width && y >= 0 && y < height)
        {
            locations[x] ||= [];
            if(!locations[x][y])
            {
                locations[x][y] = true;
                count++;
            }
        }
    }

    for(let char in nodes)
    {
        let nodeList = nodes[char];
        for(let i = 0; i < nodeList.length - 1; i++)
        {
            for(let j = i + 1; j < nodeList.length; j++)
            {
                let x1 = (nodeList[i].x - nodeList[j].x) + nodeList[i].x;
                let y1 = (nodeList[i].y - nodeList[j].y) + nodeList[i].y;
                let x2 = (nodeList[j].x - nodeList[i].x) + nodeList[j].x;
                let y2 = (nodeList[j].y - nodeList[i].y) + nodeList[j].y;
                checkPos(x1, y1);
                checkPos(x2, y2);
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});