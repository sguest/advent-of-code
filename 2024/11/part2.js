let lib = require('../../lib');

let year = 2024;
let day = 11;

lib.getInput(year, day).then((data) => {
    let stones = data.split(' ');

    let patterns = {
        '0': ['1']
    };
    let counts = {};

    for(let stone of stones) {
        counts[stone] ||= 0;
        counts[stone]++;
    }

    for(let i = 0; i < 75; i++)
    {
        let newCounts = {};
        for(let stone in counts)
        {
            if(!patterns[stone])
            {
                if(stone.length % 2 === 0)
                {
                    patterns[stone] = [(+stone.substring(0, stone.length / 2)).toString(), (+stone.substring(stone.length / 2)).toString()];
                }
                else {
                    patterns[stone] = [(+stone * 2024).toString()];
                }
            }

            let baseCount = counts[stone];

            for(let newStone of patterns[stone])
            {
                newCounts[newStone] ||= 0;
                newCounts[newStone] += baseCount;
            }
        }
        counts = newCounts;
    }

    let total = 0;
    for(let stone in counts)
    {
        total += counts[stone];
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});