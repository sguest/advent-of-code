let lib = require('../../lib');
let parseLetters = require('../../2019/lib/parseLetters');

let year = 2022;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let xRegister = 1;
    let xPos = 0;
    let lineNum = 0;
    let addPending = null;
    let line = '';
    let outLines = [];
    let y = 0;
    while(y < 6) {
        if(Math.abs(xRegister - xPos) <= 1) {
            line += '#';
        }
        else {
            line += ' ';
        }

        if(addPending !== null) {
            xRegister += addPending;
            addPending = null;
            lineNum++;
        }
        else if(lines[lineNum].startsWith('addx')) {
            addPending = +(lines[lineNum].split(' ')[1])
        }
        else {
            lineNum++;
        }

        xPos++;
        if(xPos >= 40) {
            xPos = 0;
            y++;
            outLines.push(line);
            line = '';
        }
    }

    let outData = [];

    for(let x = 0; x < 40; x++) {
        outData[x] = [];
        for(let y = 0; y < 6; y++) {
            outData[x][y] = (outLines[y][x] === '#');
        }
    }

    console.log(parseLetters(outData));
}).catch((err) => {
    console.log(err, err.stack);
});