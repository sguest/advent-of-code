let lib = require('../../lib');

let year = 2024;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let rulePhase = true;
    let sum = 0;
    let rules = {};

    for(let line of lines) {
        if(!line)
        {
            rulePhase = false;
        }
        else if(rulePhase)
        {
            let parts = line.split('|');
            rules[parts[1]] ||= [];
            rules[parts[1]].push(parts[0]);
        }
        else {
            let parts = line.split(',');
            let valid = true;
            for(let i = 0; i < parts.length - 1; i++)
            {
                for(let j = i + 1; j < parts.length; j++)
                {
                    if(rules[parts[i]].includes(parts[j]))
                    {
                        valid = false;
                    }
                }
            }

            if(valid) {
                sum += +parts[(parts.length - 1) / 2]
            }
        }
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});