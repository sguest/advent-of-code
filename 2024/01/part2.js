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

    let sum = 0;

    for(let item of list1)
    {
        let count2 = list2.filter(i => i === item).length;
        sum += item * count2;
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});