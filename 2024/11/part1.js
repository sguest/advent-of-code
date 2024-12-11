let lib = require('../../lib');

let year = 2024;
let day = 11;

lib.getInput(year, day).then((data) => {
    let stones = data.split(' ');

    for(let i = 0; i < 25; i++)
    {
        let newStones = [];
        for(let stone of stones)
        {
            if(stone === '0')
            {
                newStones.push('1');
            }
            else if(stone.length % 2 === 0)
            {
                let parts = [stone.substring(0, stone.length / 2), stone.substring(stone.length / 2)];
                for(let part of parts)
                {
                    newStones.push((+part).toString());
                }
            }
            else
            {
                newStones.push((+stone * 2024).toString())
            }
        }
        stones = newStones;
    }

    console.log(stones.length);
}).catch((err) => {
    console.log(err, err.stack);
});