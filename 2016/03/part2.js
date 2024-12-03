var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var parse = /(\d+)\s*(\d+)\s*(\d+)/;
    var count = 0;
    var triangles = [[], [], []];
    for(var line of data.trim().split('\n')) {
        var parsed = parse.exec(line);
        var sides = [];
        for(var index = 0; index < 3; index++) {
            triangles[index].push(parseInt(parsed[index + 1], 10));
        }

        if(triangles[0].length === 3) {
            for(var triangle of triangles) {
                triangle = triangle.sort((a, b) => a - b);
                if(triangle[0] + triangle[1] > triangle[2]) {
                    count ++;
                }
            }
            triangles = [[], [], []];
        }
    }
    console.log(count);
});