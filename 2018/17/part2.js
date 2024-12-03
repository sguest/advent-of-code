let lib = require('../../lib');

let year = 2018;
let day = 17;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let grid = [];

    function getGrid(x, y) {
        return grid[x] && grid[x][y];
    }

    let filled = {};
    let filledCount = 0;
    function doCountFilled(x, y) {
        if(y < minY || y > maxY) {
            return;
        }
        if(filled[x + ',' + y]) {
            return;
        }
        filled[x + ',' + y] = true;
        filledCount++;
    }

    let minY = Infinity;
    let maxY = 0;
    for(let line of lines) {
        let parsed = /(x|y)=(\d+), (x|y)=(\d+)\.\.(\d+)/.exec(line);

        if(parsed[1] === 'x') {
            let x = +parsed[2];
            let y1 = +parsed[4];
            let y2 = +parsed[5];

            for(let y = y1; y <= y2; y++) {
                grid[x] = grid[x] || [];
                grid[x][y] = true;
            }
            minY = Math.min(minY, y1);
            maxY = Math.max(maxY, y2);
        }
        else {
            let y = +parsed[2];
            let x1 = +parsed[4];
            let x2 = +parsed[5];

            for(let x = x1; x <= x2; x++) {
                grid[x] = grid[x] || [];
                grid[x][y] = true;
            }

            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
    }

    let root = {x: 500, y: 0};
    root.origin = root;
    let sourceMap = {};
    sourceMap['500,0'] = true;
    let waterPath = [root];

    while(waterPath.length) {
        let water = waterPath.pop();
        if(water.y > maxY) {
            continue;
        }
        if(!getGrid(water.x, water.y + 1)) {
            waterPath.push({x: water.x, y: water.y + 1, origin: water.origin});
        }
        else {
            let minX = water.x;
            while(!getGrid(minX - 1, water.y) && getGrid(minX, water.y + 1)) {
                minX--;
            }
            let maxX = water.x;
            while(!getGrid(maxX + 1, water.y) && getGrid(maxX, water.y + 1)) {
                maxX++;
            }

            let leftCap = getGrid(minX, water.y + 1);
            let rightCap = getGrid(maxX, water.y + 1);
            if(leftCap && rightCap) {
                for(let x = minX; x <= maxX; x++) {
                    doCountFilled(x, water.y);
                    grid[x][water.y] = true;
                }

                if(water.y === water.origin.y) {
                    waterPath.push(water.origin);
                }
                else {
                    waterPath.push({x: water.origin.x, y: water.origin.y, origin: water.origin});
                }
            }
            else {
                if(!leftCap && !sourceMap[minX + ',' + water.y]) {
                    sourceMap[minX + ',' + water.y] = true;
                    waterPath.push({x: minX, y: water.y, origin: {x: minX, y: water.y, origin: water.origin}});
                }
                if(!rightCap && !sourceMap[maxX + ',' + water.y]) {
                    sourceMap[maxX + ',' + water.y] = true;
                    waterPath.push({x: maxX, y: water.y, origin: {x: maxX, y: water.y, origin: water.origin}});
                }
            }
        }
    }

    console.log(filledCount);
}).catch((err) => {
    console.log(err.stack);
});