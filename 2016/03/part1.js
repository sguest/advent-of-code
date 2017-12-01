var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var parse = /(\d+)\s*(\d+)\s*(\d+)/;
    var count = 0;
    for(var line of data.trim().split('\n')) {
        var parsed = parse.exec(line);
        var sides = [];
        for(var index = 0; index < 3; index++) {
            sides[index] = parseInt(parsed[index + 1], 10);
        }
        sides = sides.sort((a, b) => a - b);
        if(sides[0] + sides[1] > sides[2]) {
            count++;
        }
    }
    console.log(count);
});