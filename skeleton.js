var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    for(var line of data.trim().split('\n')) {
    }
});