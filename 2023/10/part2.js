let lib = require('../../lib');

let year = 2023;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let start = {};
    let isLoop = [];
    for(let y = 0; y < lines.length; y++) {
        isLoop[y] = [];
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            if(line[x] === 'S') {
                start = { x, y };
            }
        }
    }

    let x = start.x;
    let y = start.y;
    let dir;
    let below = lines[y + 1][x];
    if(below === '|' || below === 'L' || below === 'J') {
        // S could be |, F, or 7. Don't really care which
        dir = 'S';
        y++;
    }
    if(!dir) {
        let above = lines[y - 1][x];
        if(above === '|' || above ==='F' || above === '7') {
            // S could be L or J (or | but that was caught earlier). Don't really care which
            dir = 'N';
            y--;
        }
    }
    if(!dir) {
        //only possible starting shape left is -, pick E or W arbitrarily
        dir = 'E'
        x++;
    }
    let path = [start, { x, y }];
    isLoop[start.y][start.x] = true;
    isLoop[y][x] = true;

    while(x !== start.x || y !== start.y) {
        let deltaX = 0;
        let deltaY = 0;
        switch(lines[y][x] + dir) {
            case '|S':
                deltaY = 1;
                break;
            case '|N':
                deltaY = -1;
                break;
            case '-E':
                deltaX = 1;
                break;
            case '-W':
                deltaX = -1;
                break;
            case 'LS':
                deltaX = 1;
                break;
            case 'LW':
                deltaY = -1;
                break;
            case 'JS':
                deltaX = -1;
                break;
            case 'JE':
                deltaY = -1;
                break;
            case '7N':
                deltaX = -1;
                break;
            case '7E':
                deltaY = 1;
                break;
            case 'FN':
                deltaX = 1;
                break;
            case 'FW':
                deltaY = 1;
                break;
            default:
                throw 'unrecognized ' + lines[y][x] + dir;
        }
        if(deltaY === 1) {
            dir = 'S';
        }
        else if(deltaY === -1) {
            dir = 'N';
        }
        else if(deltaX === -1) {
            dir = 'W';
        }
        else {
            dir = 'E';
        }
        x += deltaX;
        y += deltaY;
        isLoop[y] = isLoop[y] || [];
        isLoop[y][x] = true;
        path.push({ x, y });
    }

    let count  = 0;
    for(let yy = 0; yy < lines.length; yy++) {
        let crosses = 0;
        let line = lines[yy];
        let corner = false;
        for(let xx = 0; xx < line.length; xx++) {
            if(isLoop[yy][xx]) {
                let current = lines[yy][xx];
                if(current === '|') {
                    crosses++;
                }
                else if(current !== '-') {
                    if(corner) {
                        if(corner === 'L' && current === '7') {
                            crosses++;
                        }
                        else if(corner === 'F' && current === 'J') {
                            crosses ++;
                        }
                        corner = false;
                    }
                    else {
                        corner = current;
                    }
                }
            }
            else if(crosses % 2 === 1) {
                count++;
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});