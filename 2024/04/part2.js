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

    let count = 0;
    for(let x = 1; x < width - 1; x++)
    {
        for(let y = 1; y < height - 1; y++)
        {
            if(getChar(x, y) === 'A')
            {
                if(
                    ((getChar(x - 1, y - 1) === 'M' && getChar(x + 1, y + 1) === 'S') || (getChar(x - 1, y - 1) === 'S' && getChar(x + 1, y + 1) === 'M')) &&
                    ((getChar(x - 1, y + 1) === 'M' && getChar(x + 1, y - 1) === 'S') || (getChar(x - 1, y + 1) === 'S' && getChar(x + 1, y - 1) === 'M'))
                )
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