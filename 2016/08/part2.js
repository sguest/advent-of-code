let fs = require('fs');
let lib = require('../../lib');

lib.getInput(2016, 8).then((data) => {
    data = data.trim();
    let rectParse = /^rect (\d+)x(\d+)$/;
    let rotateParse = /^rotate (row|column) (?:x|y)=(\d+) by (\d+)$/;
    let grid = [];

    for(let x = 0; x < 50; x++) {
        grid[x] = [];
    }

    for(let line of data.split('\n')) {
        let parsed = rectParse.exec(line);
        if(parsed) {
            let width = parseInt(parsed[1], 10);
            let height = parseInt(parsed[2], 10);

            for(let x = 0; x < width; x++) {
                for(let y = 0; y < height; y++) {
                    grid[x][y] = true;
                }
            }
            continue;
        }

        parsed = rotateParse.exec(line);
        let index = parseInt(parsed[2], 10);
        let amount = parseInt(parsed[3], 10);
        if(parsed[1] === 'row') {
            let newRow = [];
            for(let x = 0; x < 50; x++) {
                newRow[(x + amount) % 50] = grid[x][index];
            }
            for(let x = 0; x < 50; x++) {
                grid[x][index] = newRow[x];
            }
        }
        else {
            let newColumn = [];
            for(let y = 0; y < 6; y++) {
                newColumn[(y + amount) % 6] = grid[index][y];
            }
            grid[index] = newColumn;
        }
    }

    let letterFile = fs.readFileSync(__dirname + '\\letters.txt', 'utf-8');
    let letterLines = letterFile.trim().replace(/\r\n/g, '\n').split('\n');

    let letterData = {};
    while(letterLines.length) {
        let char = letterLines.shift();
        let d = [];
        for(let y = 0; y < 6; y++) {
            let line = letterLines.shift();
            d.push([].map.call(line, (c) => c === '#'));
        }
        letterData[char] = d;
    }

    let letterMaps = [];

    for(let letter = 0; letter < grid.length; letter += 5) {
        let letterMap = [];

        for(let y = 0; y < 6; y++) {
            letterMap.push([]);
            for(let x = 0; x < 4; x++) {
                letterMap[y].push(!!grid[x + letter][y]);
            }
        }

        letterMaps.push(letterMap);
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
});