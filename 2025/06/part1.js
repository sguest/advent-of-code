let lib = require('../../lib');

let year = 2025;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let inputs1 = lines[0].trim().split(/\s+/).map(x => +x);
    let inputs2 = lines[1].trim().split(/\s+/).map(x => +x);
    let inputs3 = lines[2].trim().split(/\s+/).map(x => +x);
    let inputs4 = lines[3].trim().split(/\s+/).map(x => +x);
    let operators = lines[4].trim().split(/\s+/);

    let total = 0;
    for(let i = 0; i < inputs1.length; i++) {
        if(operators[i] === '+') {
            total += inputs1[i] + inputs2[i] + inputs3[i] + inputs4[i];
        }
        else
        {
            total += inputs1[i] * inputs2[i] * inputs3[i] * inputs4[i];
        }
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});