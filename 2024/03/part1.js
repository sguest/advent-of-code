let lib = require('../../lib');

let year = 2024;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let regex = /mul\((\d+),(\d+)\)/g;
    let sum = 0;
    for(let line of lines) {
        while(result = regex.exec(line))
        {
            let product = (+result[1]) * (+result[2]);
            sum += product;
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});