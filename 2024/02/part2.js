let lib = require('../../lib');

let year = 2024;
let day = 2;

function checkLevels(levels)
{
    let min = 0;
    let max = 0;
    if(levels[0] > levels[1])
    {
        min = -3;
        max = -1;
    }
    else if(levels[0] < levels[1])
    {
        min = 1;
        max = 3;
    }
    if(min === 0)
    {
        return false;
    }

    let current = levels[0];
    let ok = true;
    for(let i = 1; i < levels.length; i++)
    {
        let delta = levels[i] - current;
        if(delta < min || delta > max) {
            ok = false;
        }
        current = levels[i];
    }
    return ok;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let safe = 0;
    for(let line of lines) {
        let levels = line.split(' ').map(x => +x);
        let ok = checkLevels(levels);

        let i = 0;
        while(i < levels.length && !ok)
        {
            let newLevels = [...levels];
            newLevels.splice(i, 1);
            ok = checkLevels(newLevels);
            i++
        }

        if(ok)
        {
            safe++;
        }
    }
    console.log(safe);
}).catch((err) => {
    console.log(err, err.stack);
});

// 760 too high