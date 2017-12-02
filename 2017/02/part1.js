let fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();
    let total = 0;
    for(let line of data.split('\n')) {
        let nums = line.split(/\s+/).map(x => parseInt(x, 10));

        let max = 0;
        let min = Infinity;
        
        for(let num of nums) {
            if(num < min) {
                min = num;
            }
            if(num > max) {
                max = num;
            }
        }

        total += max - min;
    }
    console.log(total);
});