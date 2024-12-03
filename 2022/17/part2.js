let lib = require('../../lib');

let year = 2022;
let day = 17;

lib.getInput(year, day).then(data => {
    let rocks = [
        {
            width: 4,
            height: 1,
            map: [
                [true, true, true, true]
            ],
        },
        {
            width: 3,
            height: 3,
            map: [
                [false, true, false],
                [true, true, true],
                [false, true, false],
            ],
        },
        {
            width: 3,
            height: 3,
            map: [
                [true, true, true],
                [false, false, true],
                [false, false, true],
            ],
        },
        {
            width: 1,
            height: 4,
            map: [
                [true],
                [true],
                [true],
                [true],
            ],
        },
        {
            width: 2,
            height: 2,
            map: [
                [true, true],
                [true, true],
            ]
        }
    ]

    let inputIndex = 0;
    let rockIndex = 0;
    let maxHeight = [0, 0, 0, 0, 0, 0, 0];
    let fallenRocks = [];

    let getFallen = (x, y) => {
        return fallenRocks[y] && fallenRocks[y][x];
    }

    let setFallen = (x, y) => {
        fallenRocks[y] = fallenRocks[y] || [];
        fallenRocks[y][x] = true;
        maxHeight[x] = Math.max(y + 1, maxHeight[x]);
    }

    let checkPosition = (rockX, rockY, pattern) => {
        if(rockX < 0) {
            return false;
        }
        if(rockX + pattern.width > 7) {
            return false;
        }

        if(rockY < 0) {
            return false;
        }

        for(let y = 0; y < pattern.height; y++) {
            for(let x = 0; x < pattern.width; x++) {
                if(pattern.map[y][x] && getFallen(x + rockX, y + rockY)) {
                    return false;
                }
            }
        }

        return true;
    }

    const debug = false;

    let cache = {};
    let heights = [];

    let rockNum = 0;

    let cacheHits = 0;
    let cacheStart = 0;
    let cacheEnd = 0;

    while(true) {
        let activeRock = {
            x: 2,
            y: Math.max(...maxHeight) + 3,
            pattern: rocks[rockIndex],
        }

        if(debug) {
            console.log('==========================');
            for(let y = activeRock.pattern.height - 1; y >= 0; y--) {
                let line = '  ';
                for(let x = 0; x < activeRock.pattern.width; x++) {
                    if(activeRock.pattern.map[y][x]) {
                        line += '@';
                    }
                    else {
                        line += ' ';
                    }
                }
                console.log(line);
            }

            console.log('');
            console.log('');
            console.log('');

            for(let y = maxHeight; y >= 0; y--) {
                let line = '';
                for(let x = 0; x < 7; x++) {
                    if(getFallen(x, y)) {
                        line += '#';
                    }
                    else {
                        line += ' ';
                    }
                }
                console.log(line);
            }
        }

        let stopped = false;

        let prevHeight = [...maxHeight];
        while(!stopped) {
            let action = data[inputIndex];

            let newX = activeRock.x;
            if(action === '<') {
                newX--;
            }
            else {
                newX++;
            }

            if(checkPosition(newX, activeRock.y, activeRock.pattern)) {
                activeRock.x = newX;
            }

            if(checkPosition(activeRock.x, activeRock.y - 1, activeRock.pattern)) {
                activeRock.y--;
            }
            else {
                stopped = true;
                for(let y = 0; y < activeRock.pattern.height; y++) {
                    for(let x = 0; x < activeRock.pattern.width; x++) {
                        if(activeRock.pattern.map[y][x]) {
                            setFallen(x + activeRock.x, y + activeRock.y);
                        }
                    }
                }
            }

            inputIndex = (inputIndex + 1) % data.length;
        }

        heights[rockNum] = Math.max(...maxHeight);

        let heightDelta = maxHeight.map((height, index) => height - prevHeight[index]);
        let cacheKey = `${heightDelta.join(',')}-${rockIndex}-${inputIndex}`;

        if(cache[cacheKey]) {
            cacheHits++;
            if(cacheStart === 0) {
                cacheStart = cache[cacheKey];
                cacheEnd = rockNum;
            }
            if(cacheHits > data.length) {
                let offset = cacheStart;
                let period = cacheEnd - offset;
                let baseHeight = heights[offset];
                let currentHeight = heights[cacheEnd];
                let heightDelta = currentHeight - baseHeight;
                const rockTarget = 1000000000000 - 1;

                let cycles = Math.floor((rockTarget - offset) / period);
                let completeAfterCycles = cycles * period + offset;
                let remainder = rockTarget - completeAfterCycles;
                let remainingHeight = heights[offset + remainder] - baseHeight;
                
                console.log(cycles * heightDelta + baseHeight + remainingHeight);
                process.exit(0);
            }
        }
        else {
            cache[cacheKey] = rockNum;
            cacheHits = 0;
            cacheStart = 0;
            cacheEnd = 0;
        }

        rockIndex = (rockIndex + 1) % rocks.length;
        rockNum++;
    }
}).catch((err) => {
    console.log(err, err.stack);
});