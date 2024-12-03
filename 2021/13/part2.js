let lib = require('../../lib');
let parseLetters = require('../../2019/lib/parseLetters');

let year = 2021;
let day = 13;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let dots = [];
    let instructions = [];
    let parsingDots = true;
    for(let line of lines) {
        if(!line) {
            parsingDots = false;
        }
        else if(parsingDots) {
            let parts = line.split(',');
            dots.push({x: +parts[0], y: +parts[1]});
        }
        else {
            line = line.replace(/^fold along /, '');
            let parts = line.split('=');
            instructions.push({dir: parts[0], value: +parts[1]});
        }
    }

    for(let instruction of instructions) {
        let dir = instruction.dir;
        let val = instruction.value;

        for(let dot of dots) {
            if(dot[dir] > val) {
                let delta = dot[dir] - val;
                dot[dir] = val - delta;
            }
        }
    }

    let visible = [];
    let count = 0;
    let maxX = 0;
    let maxY = 0;

    for(let dot of dots) {
        visible[dot.x] = visible[dot.x] || [];
        if(!visible[dot.x][dot.y]) {
            count++;
            visible[dot.x][dot.y] = true;
            maxX = Math.max(dot.x, maxX);
            maxY = Math.max(dot.y, maxY);
        }
    }

    let outLines = [];
    for(let x = 0; x <= maxX; x++) {
        outLines.push([]);
    }
    let extra = [];
    for(let y = 0; y <= maxY; y++) {
        extra.push(false);
    }
    outLines.push(extra);
    for(x = 0; x <= maxX; x++) {
        let vLine = visible[x] || [];
        for(let y = 0; y <= maxY; y++) {
            if(vLine[y]) {
                outLines[x].push(true);
            }
            else {
                outLines[x].push(false);
            }
        }
    }

    console.log(parseLetters(outLines));

}).catch((err) => {
    console.log(err, err.stack);
});