let lib = require('../../lib');

let year = 2025;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    const getCell = (x, y) => {
        return lines[y] && lines[y][x] === '@';
    }

    let count = 0;

    for(let y = 0; y < lines.length; y++)
    {
        let line = lines[y];
        for(let x = 0; x < line.length; x++)
        {
            if(getCell(x, y))
            {
                let adjacent = 0;
                for(let xx = x - 1; xx <= x + 1; xx++)
                {
                    for(let yy = y - 1; yy <= y + 1; yy++)
                    {
                        if((x != xx || y != yy) && getCell(xx, yy)) {
                            adjacent++;
                        }
                    }
                }
                if(adjacent < 4) {
                    count++;
                }
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});