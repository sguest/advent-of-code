var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var count = 0;
    var alternate = /(.).\1/;
    var doublePair = /(..).*\1/;
    for(var line of data.trim().split('\n')) {
        if(alternate.test(line) && doublePair.test(line)) {
            count++;
        }
    }
    console.log(count);
});