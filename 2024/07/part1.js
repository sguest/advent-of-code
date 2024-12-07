let lib = require('../../lib');

let year = 2024;
let day = 7;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let result = 0;
    for(let line of lines) {
        let split1 = line.split(': ');
        let total = +split1[0];
        let values = split1[1].split(' ').map(x => +x);
        let numBranches = Math.pow(2, values.length - 1);
        let found = false;

        for(let i = 0; i < numBranches; i++)
        {
            if(!found)
            {
                let flags = i;
                let sum = values[0];
                for(let j = 1; j < values.length; j++)
                {
                    if(flags % 2 === 0)
                    {
                        sum += values[j];
                    }
                    else {
                        sum *= values[j];
                    }

                    flags = flags >> 1;
                }
                if(sum === total)
                {
                    found = true;
                    result += total;
                }
            }
        }
    }
    console.log(result);
}).catch((err) => {
    console.log(err, err.stack);
});