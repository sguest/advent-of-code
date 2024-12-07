let lib = require('../../lib');

let year = 2024;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let rulePhase = true;
    let rules = {};
    let invalidOrderings = [];

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

            if(!valid) {
                invalidOrderings.push(line);
            }
        }
    }

    let sum = 0;

    for(let line of invalidOrderings)
    {
        let parts = line.split(',');
        let clean = false;
        while(!clean)
        {
            clean = true;
            for(let i = 0; i < parts.length - 1; i++)
            {
                for(let j = i + 1; j < parts.length; j++)
                {
                    if(clean)
                    {
                        if(rules[parts[i]].includes(parts[j]))
                        {
                            clean = false;
                            let removed = parts.splice(j, 1);
                            parts.splice(i, 0, removed);
                        }
                    }
                }
            }
        }

        sum += +parts[(parts.length - 1) / 2];
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});