let lib = require('../../lib');

let year = 2024;
let day = 15;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let parsingMap = true;
    let map = [];
    let boxes = [];
    let pos = {};
    let moves = [];

    const drawGrid = () => {
        for(let y = 0; y < map.length; y++) {
            let line = '';

            for(let x = 0; x < map[y].length; x++)
            {
                if(boxes[y][x] && map[y][x] || (pos.x === x && pos.y === y && (boxes[y][x] || map[y][x])))
                {
                    line += '!'
                }
                else if(pos.x === x && pos.y === y) {
                    line += '@'
                }
                else if(map[y][x])
                {
                    line += '#'
                }
                else if(boxes[y][x])
                {
                    line += 'O'
                }
                else
                {
                    line += '.'
                }
            }

            console.log(line);
        }
    }

    for(let y = 0; y < lines.length; y++) {
        map[y] = [];
        boxes[y] = [];
        let line = lines[y];
        if(line === '') {
            parsingMap = false;
        }
        else if(parsingMap)
        {
            for(let x = 0; x < line.length; x++)
            {
                let char = line[x];
                
                if(char === '@')
                {
                    map[y][x] = false;
                    boxes[y][x] = false;
                    pos = { x, y };
                }
                else if(char === '#')
                {
                    map[y][x] = true;
                    boxes[y][x] = false;
                }
                else if(char === 'O')
                {
                    boxes[y][x] = true;
                    map[y][x] = false;
                }
                else
                {
                    boxes[y][x] = false;
                    map[y][x] = false;
                }
            }
        }
        else
        {
            moves.push(...line.split(''));
        }
    }

    let deltas = {
        '^': { x: 0, y: -1 },
        'v': { x: 0, y: 1 },
        '<': { x: -1, y: 0 },
        '>': { x: 1, y: 0 },
    };

    for(let move of moves) {
        let delta = deltas[move];
        let pushing = false;
        let blocked = false;
        let done = false;
        let target = { ...pos };
        while(!done)
        {
            target.x += delta.x;
            target.y += delta.y;
            if(map[target.y][target.x])
            {
                blocked = true;
                done = true;
            }
            else if(boxes[target.y][target.x])
            {
                pushing = true;
            }
            else
            {
                done = true;
            }
        }

        if(!blocked)
        {
            pos = { x: pos.x + delta.x, y: pos.y + delta.y };
            if(pushing) {
                boxes[pos.y][pos.x] = false;
                boxes[target.y][target.x] = true;
            }
        }

    }

    let sum = 0;

    for(let y = 0; y < boxes.length; y++)
    {
        for(let x = 0; x < boxes[y].length; x++)
        {
            if(boxes[y][x]) {
                sum += y * 100 + x;
            }
        }
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});