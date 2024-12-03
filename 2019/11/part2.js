let lib = require('../../lib');
let intcodes = require ('../lib/intcodes');
let parseLetters = require('../lib/parseLetters');

let year = 2019;
let day = 11;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    let program = intcodes.compile(codes);
    let count = 0;
    let facing = 'u';
    let x = 0;
    let y = 0;
    let painted = [];
    let tiles = [];

    let output = {};

    let delta = {
        'u': {x: 0, y: -1},
        'd': {x: 0, y: 1},
        'r': {x: 1, y: 0},
        'l': {x: -1, y: 0}
    }

    let facingChange = {
        u:['l', 'r'],
        d:['r','l'],
        r:['u','d'],
        l:['d','u'],
    }

    tiles[0] = [];
    tiles[0][0] = 1;

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    while(output.signal !== 'end') {
        tiles[x] = tiles[x] || [];
        painted[x] = painted[x] || [];
        let currentTile = tiles[x][y] || 0;

        output = program.run(currentTile);

        if(output.signal !== 'end') {
            tiles[x][y] = output.value;

            if(!painted[x][y]) {
                count++;
                painted[x][y] = true;
            }

            output = program.run();
        }

        if(output.signal !== 'end') {
            facing = facingChange[facing][output.value];
            x += delta[facing].x;
            y += delta[facing].y;

            minX = Math.min(x, minX);
            maxX = Math.max(x, maxX);
            minY = Math.min(y, minY);
            maxY = Math.max(y, maxY);
        }
    }

    let outputData = [];
    let started = false;

    for(let x = minX; x <= maxX; x++) {
        let row = [];
        let found = false;
        for(let y = minY; y <= maxY; y++) {
            row[y] = (tiles[x][y] === 1);
            found = found || row[x];
        }

        if(started || found) {
            outputData.push(row);
            started = true;
        }
    }

    console.log(parseLetters(outputData));
}).catch((err) => {
    console.log(err, err.stack);
});