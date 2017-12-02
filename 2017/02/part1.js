let fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();
    let total = 0;
    for(let line of data.split('\n')) {
        let nums = line.split(/\s+/).map(x => parseInt(x, 10));

        total+= Math.max(...nums) - Math.min(...nums);
    }
    console.log(total);
});