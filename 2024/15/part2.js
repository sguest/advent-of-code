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
                if(map[y][x])
                {
                    let foundBox = false;
                    for(let box of boxes) {
                        if(box.y === y && (box.x === x || box.x === x - 1))
                        {
                            foundBox = true;
                        }
                    }

                    if(foundBox || (pos.x === x && pos.y === y))
                    {
                        line += '!';
                    }
                    else
                    {
                        line += '#';
                    }
                }
                else if(pos.x === x && pos.y === y)
                {
                    let foundBox = false;
                    for(let box of boxes) {
                        if(box.y === y && (box.x === x || box.x === x - 1))
                        {
                            foundBox = true;
                        }
                    }

                    if(foundBox)
                    {
                        line += '!';
                    }
                    else
                    {
                        line += '@';
                    }
                }
                else
                {
                    let foundBox = false;
                    for(let box of boxes)
                    {
                        if(box.x === x && box.y === y)
                        {
                            line += '[';
                            foundBox = true;
                        }
                        else if(box.x === x - 1 && box.y === y)
                        {
                            line += ']';
                            foundBox = true;
                        }
                    }

                    if(!foundBox) {
                        line += '.';
                    }
                }
            }

            console.log(line);
        }
    }

    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        if(line === '') {
            parsingMap = false;
        }
        else if(parsingMap)
        {
            map[y] = [];
            for(let x = 0; x < line.length; x++)
            {
                let char = line[x];
                let mapX = x * 2;
                
                if(char === '@')
                {
                    map[y][mapX] = false;
                    map[y][mapX + 1] = false;
                    pos = { x: mapX, y };
                }
                else if(char === '#')
                {
                    map[y][mapX] = true;
                    map[y][mapX + 1] = true;
                }
                else if(char === 'O')
                {
                    map[y][mapX] = false;
                    map[y][mapX + 1] = false;
                    boxes.push({ x: mapX, y });
                }
                else
                {
                    map[y][mapX] = false;
                    map[y][mapX + 1] = false;
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
        let newBoxes = boxes.map(b => ({ ...b }));
        let movingBoxes = [];
        let newPos = { x: pos.x + delta.x, y: pos.y + delta.y };
        let blocked = false;

        if(!map[newPos.y][newPos.x])
        {
            for(let box of newBoxes)
            {
                if(box.y === newPos.y && (box.x === newPos.x || box.x === newPos.x - 1))
                {
                    movingBoxes.push(box);
                }
            }

            while(movingBoxes.length)
            {
                let movingBox = movingBoxes.pop();
                movingBox.x += delta.x;
                movingBox.y += delta.y;
                if(map[movingBox.y][movingBox.x] || map[movingBox.y][movingBox.x + 1])
                {
                    movingBoxes = [];
                    blocked = true;
                }
                else
                {
                    for(let box of newBoxes)
                    {
                        if(box !== movingBox && box.y === movingBox.y && Math.abs(box.x - movingBox.x) <= 1)
                        {
                            movingBoxes.push(box);
                        }
                    }
                }
            }

            if(!blocked) {
                boxes = newBoxes;
                pos = newPos;
            }
        }
    }

    let sum = 0;

    for(let box of boxes)
    {
        sum += box.y * 100 + box.x;
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});