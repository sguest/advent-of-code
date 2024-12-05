let lib = require('../../lib');

let year = 2024;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    function getChar(x, y) {
        return lines[y] && lines[y][x];
    }

    let width = lines[0].length;
    let height = lines.length;

    let deltas = [
        {x: 1, y: 0},
        {x: -1, y: 0},
        {x: 0, y: 1},
        {x: 0, y: -1},
        {x: 1, y: 1},
        {x: 1, y: -1},
        {x: -1, y: 1},
        {x: -1, y: -1},
    ]

    let count = 0;
    for(let x = 0; x < width; x++)
    {
        for(let y = 0; y < height; y++)
        {
            for(let delta of deltas)
            {
                let word = '';

                for(let i = 0; i < 4; i++) 
                {
                    word += getChar(x + i * delta.x, y + i * delta.y);
                }

                if(word === 'XMAS')
                {
                    count++;
                }
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});