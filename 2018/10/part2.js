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

    let time = 0;

    while(currentArea < lastArea) {
        time++;
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

    console.log(time - 1);
}).catch((err) => {
    console.log(err.stack);
});