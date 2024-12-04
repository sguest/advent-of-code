let lib = require('../../lib');

let year = 2024;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let regex = /(?:(do)\(\))|(?:(don\'t)\(\))|(?:(mul)\((\d+),(\d+)\))/g;
    let sum = 0;
    let enabled = true;
    for(let line of lines) {
        while(result = regex.exec(line))
        {
            if(result[1])
            {
                enabled =true;
            }
            else if(result[2])
            {
                enabled = false;
            }
            else if(enabled)
            {
                let product = (+result[4]) * (+result[5]);
                sum += product;
            }
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});