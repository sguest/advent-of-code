let lib = require('../../lib');
let fs = require('fs');
let path = require('path');

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

    let letterMaps = [];

    for(let i = 0; i < maxX - minX; i+=8) {
        let letterMap = [];

        for(let y = 0; y <= maxY - minY; y++) {
            letterMap.push([]);
            for(let x = 0; x < 6; x++) {
                letterMap[y].push(!!grid[x + i][y]);
            }
        }

        letterMaps.push(letterMap);
    }

    let file = fs.readFileSync(path.resolve(__dirname, 'letters.txt'), 'utf-8');
    let letterLines = file.trim().replace(/\r\n/g, '\n').split('\n');

    let letterData = {};
    while(letterLines.length) {
        let char = letterLines.shift();
        let d = [];
        for(let y = 0; y < 10; y++) {
            let line = letterLines.shift();
            d.push([].map.call(line, (c) => c === '#'));
        }
        letterData[char] = d;
    }

    let result = '';

    letterLoop: for(let letter of letterMaps) {
        charLoop: for(let char in letterData) {
            for(let x = 0; x < letterData[char].length; x++) {
                for(let y = 0; y < letterData[char][x].length; y++) {
                    if(letter[x][y] !== letterData[char][x][y])  {
                        continue charLoop;
                    }
                }
            }
            result += char;
            continue letterLoop;
        }

        console.log('unrecognized letter data');
        console.log(letter);
    }

    console.log(result);
}).catch((err) => {
    console.log(err.stack);
});