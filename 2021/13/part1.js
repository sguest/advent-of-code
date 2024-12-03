let lib = require('../../lib');

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

    let dir = instructions[0].dir;
    let val = instructions[0].value;

    for(let dot of dots) {
        if(dot[dir] > val) {
            let delta = dot[dir] - val;
            dot[dir] = val - delta;
        }
    }

    let visible = [];
    let count = 0;

    for(let dot of dots) {
        visible[dot.x] = visible[dot.x] || [];
        if(!visible[dot.x][dot.y]) {
            count++;
            visible[dot.x][dot.y] = true;
        }
    }

    console.log(count);

}).catch((err) => {
    console.log(err, err.stack);
});