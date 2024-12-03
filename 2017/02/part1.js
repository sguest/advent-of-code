let lib = require('../../lib');

lib.getInput(2017, 2).then((data) => {
    let total = 0;
    for(let line of data.split('\n')) {
        let nums = line.split(/\s+/).map(x => parseInt(x, 10));

        total+= Math.max(...nums) - Math.min(...nums);
    }
    console.log(total);
});