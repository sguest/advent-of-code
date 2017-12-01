var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var total = 0;

    for(var line of data.trim().split('\n')) {
        var measurements = line.split('x').map(x => parseInt(x, 10));
        var sides = [measurements[0] * measurements[1], measurements[0] * measurements[2], measurements[1] * measurements[2]];
        sides = sides.sort((a, b) => a - b);
        total += sides[0] * 3 + sides[1] * 2 + sides[2] * 2;
    }

    console.log(total);
});