let lib = require('../../lib');

let year = 2018;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let points = [];
    for(let line of lines) {
        let parsed = /position=\<\s*(-?\d+),\s*(-?\d+)\> velocity=\<\s*(-?\d+),\s*(-?\d+)\>/.exec(line);
        points.push({x: +parsed[1], y: +parsed[2], xVel: +parsed[3], yVel: +parsed[4]});
    }

    let lastArea = Infinity;

    let minX = Math.min.apply(null, points.map(p => p.x));
    let maxX = Math.max.apply(null, points.map(p => p.x));
    let minY = Math.min.apply(null, points.map(p => p.y));
    let maxY = Math.max.apply(null, points.map(p => p.y));

    let currentArea = (maxX - minX) * (maxY - minY);

    while(currentArea < lastArea) {
        lastArea = currentArea;

        for(let point of points) {
            point.x += point.xVel;
            point.y += point.yVel;
        }

        minX = Math.min.apply(null, points.map(p => p.x));
        maxX = Math.max.apply(null, points.map(p => p.x));
        minY = Math.min.apply(null, points.map(p => p.y));
        maxY = Math.max.apply(null, points.map(p => p.y));

        currentArea = (maxX - minX) * (maxY - minY);
    }

    for(let i = 0; i < 1; i++) {
        for(let point of points) {
            point.x -= point.xVel;
            point.y -= point.yVel;
        }
    }

    minX = Math.min.apply(null, points.map(p => p.x));
    maxX = Math.max.apply(null, points.map(p => p.x));
    minY = Math.min.apply(null, points.map(p => p.y));
    maxY = Math.max.apply(null, points.map(p => p.y));

    let grid = [];
    for(let x = 0; x <= maxX - minX; x++) {
        grid.push([]);
    }


    for(let point of points) {
        grid[point.x - minX][point.y - minY] = true;
    }

    for(let y = 0; y <= maxY - minY; y++) {
        let line = '';
        for(let x = 0; x <= maxX - minX; x++) {
            if(grid[x][y]) {
                line += '#';
            }
            else {
                line += ' ';
            }
        }
        console.log(line);
    }
}).catch((err) => {
    console.log(err.stack);
});