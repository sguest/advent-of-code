var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();
    var lights = [];
    var parser = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

    for(var line of data.split('\n')) {
        var parsed = parser.exec(line);
        var operation = parsed[1];
        var x1 = parseInt(parsed[2], 10);
        var y1 = parseInt(parsed[3], 10);
        var x2 = parseInt(parsed[4], 10);
        var y2 = parseInt(parsed[5], 10);

        for(var xx = x1; xx <= x2; xx++) {
            lights[xx] = lights[xx] || [];
            for(var yy = y1; yy <= y2; yy++) {
                if(operation === 'turn on') {
                    lights[xx][yy] = true;
                }
                else if(operation === 'turn off') {
                    lights[xx][yy] = false;
                }
                else {
                    lights[xx][yy] = !lights[xx][yy];
                }
            }
        }
    }

    var count = 0;

    for(var xx = 0; xx < 1000; xx++) {
        for(var yy = 0; yy < 1000; yy++) {
            if(lights[xx] && lights[xx][yy]) {
                count++;
            }
        }
    }

    console.log(count);
});