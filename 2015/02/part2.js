var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var total = 0;

    for(var line of data.trim().split('\n')) {
        var measurements = line.split('x').map(x => parseInt(x, 10));
        measurements.sort((a, b) => a - b);
        total += measurements[0] * 2 + measurements[1] * 2 + measurements[0] * measurements[1] * measurements[2];
    }

    console.log(total);
});