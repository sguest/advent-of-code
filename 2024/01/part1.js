let lib = require('../../lib');

let year = 2024;
let day = 1;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let list1 = [];
    let list2 = [];
    for(let line of lines) {
        let parts = line.split(/\s+/).map(x => +x);
        list1.push(parts[0]);
        list2.push(parts[1]);
    }

    list1 = list1.sort((a, b) => a - b);
    list2 = list2.sort((a, b) => a - b);


    let sum = 0;
    for(let i = 0; i < list1.length; i++)
    {
        sum += Math.abs(list1[i] - list2[i]);
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});