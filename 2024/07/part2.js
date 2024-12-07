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
        let numBranches = Math.pow(3, values.length - 1);
        let found = false;

        for(let i = 0; i < numBranches; i++)
        {
            if(!found)
            {
                let flags = i;
                let sum = values[0];
                for(let j = 1; j < values.length; j++)
                {
                    if(flags % 3 === 0)
                    {
                        sum += values[j];
                    }
                    else if(flags % 3 === 1)
                    {
                        sum *= values[j];
                    }
                    else {
                        sum = +(sum.toString() + values[j].toString());
                    }

                    flags = Math.floor(flags / 3);
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