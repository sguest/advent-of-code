let lib = require('../../lib');

let year = 2020;
let day = 20;

function flipHorizontal(grid) {
    return grid.map(line => line.split('').reverse().join(''));
}

function flipVertical(grid) {
    return grid.slice(0).reverse();
}

function rotateRight(grid) {
    let newGrid = [];
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[y].length; x++) {
            let newX = grid[x].length - y;
            let newY = x;
            newGrid[newY] = newGrid[newY] || [];
            newGrid[newY][newX] = grid[y][x];
        }
    }
    return newGrid.map(line => line.join(''));
}

function rotate180(grid) {
    return rotateRight(rotateRight(grid));
}

function rotateLeft(grid) {
    return rotateRight(rotateRight(rotateRight(grid)));
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let tiles = new Map();
    let newTile = true;
    let tileId;
    let grid;
    for(let line of lines) {
        if(!line) {
            newTile = true
        }
        else if(newTile) {
            if(grid) {
                tiles.set(tileId, { grid });
            }
            tileId = +(line.slice(5, -1));
            grid = [];
            newTile = false;
        }
        else {
            grid.push(line);
        }
    }
    tiles.set(tileId, { grid });

    let tileAxis = Math.sqrt(tiles.size);

    tiles.forEach(tile => {
        let borders = {
            top: tile.grid[0],
            bottom: tile.grid[tile.grid.length - 1],
            left: '',
            right: '',
        };
        tile.grid.forEach(line => {
            borders.left += line[0];
            borders.right += line[line.length - 1];
        })
        tile.borders = borders;
        tile.bordersReverse = {};
        for(let key in borders) {
            tile.bordersReverse[key] = [...borders[key]].reverse().join('');
        }
        let newGrid = [];
        for(let i = 1; i < tile.grid.length - 1; i++) {
            newGrid.push(tile.grid[i].slice(1, -1));
        }
        tile.grid = newGrid;
    });

    let corners = new Map();
    let firstId;

    tiles.forEach((tile, id) => {
        tile.edges = [];
        for(let key in tile.borders) {
            let found = false;
            let border = tile.borders[key];
            tiles.forEach(otherTile => {
                if(tile !== otherTile) {
                    for(let innerKey in otherTile.borders) {
                        let otherBorder = otherTile.borders[innerKey];
                        if(otherBorder === border) {
                            found = true;
                        }
                    }
                    for(let innerKey in otherTile.bordersReverse) {
                        let otherBorder = otherTile.bordersReverse[innerKey];
                        if(otherBorder === border) {
                            found = true;
                        }
                    }
                }
            });
            if(!found) {
                tile.edges.push(key);
            }
        }
        if(tile.edges.length === 2) {
            corners.set(id, tile);
            if(tile.edges.indexOf('left') !== -1 && tile.edges.indexOf('top') !== -1) {
                firstId = id;
            }
        }
    });

    let anchor = corners.get(firstId);
    tiles.delete(firstId);
    corners.delete(firstId);

    let rightBorder = anchor.borders.right;
    let bottomBorder = anchor.borders.bottom;
    let newLines = [...anchor.grid];
    let mainGrid = [];

    let go = true;

    while(go) {
        let newRightBorder;

        for(let i = 1; i < tileAxis; i++) {
            let foundGrid;
            let foundId;
            tiles.forEach((tile, id) => {
                for(let key in tile.borders) {
                    let border = tile.borders[key];
                    if(border === rightBorder) {
                        switch(key) {
                            case 'left':
                                newRightBorder = tile.borders.right;
                                foundGrid = tile.grid;
                                foundId = id;
                                break;
                            case 'right':
                                newRightBorder = tile.borders.left;
                                foundGrid = flipHorizontal(tile.grid);
                                foundId = id;
                                break;
                            case 'top':
                                newRightBorder = tile.borders.bottom;
                                foundGrid = rotateLeft(flipHorizontal(tile.grid));
                                foundId = id;
                                break;
                            case 'bottom':
                                newRightBorder = tile.borders.top;
                                foundGrid = rotateRight(tile.grid);
                                foundId = id;
                                break;
                        }
                    }
                }

                for(let key in tile.bordersReverse) {
                    let border = tile.bordersReverse[key];
                    if(border === rightBorder) {
                        switch(key) {
                            case 'left':
                                newRightBorder = tile.bordersReverse.right;
                                foundGrid = flipVertical(tile.grid);
                                foundId = id;
                                break;
                            case 'right':
                                newRightBorder = tile.bordersReverse.left;
                                foundGrid = rotate180(tile.grid);
                                foundId = id;
                                break;
                            case 'top':
                                newRightBorder = tile.bordersReverse.bottom;
                                foundGrid = rotateLeft(tile.grid);
                                foundId = id;
                                break;
                            case 'bottom':
                                newRightBorder = tile.bordersReverse.top;
                                foundGrid = rotateRight(flipHorizontal(tile.grid));
                                foundId = id;
                                break;
                        }
                    }
                }
            });
            if(foundGrid) {
                tiles.delete(foundId);
                for(let j = 0; j < foundGrid.length; j++) {
                    newLines[j] += foundGrid[j];
                }
                rightBorder = newRightBorder;
            }
        }

        mainGrid.push(...newLines);
        go = false;
        let foundGrid;
        let foundId;
        let newBottomBorder;

        tiles.forEach((tile, id) => {
            for(let key in tile.borders) {
                let border = tile.borders[key];
                if(border === bottomBorder) {
                    switch(key) {
                        case 'left':
                            rightBorder = tile.borders.bottom;
                            newBottomBorder = tile.borders.right;
                            foundGrid = rotateRight(flipVertical(tile.grid));
                            foundId = id;
                            break;
                        case 'right':
                            rightBorder = tile.bordersReverse.bottom;
                            newBottomBorder = tile.borders.left;
                            foundGrid = rotateLeft(tile.grid);
                            foundId = id;
                            break;
                        case 'top':
                            rightBorder = tile.borders.right;
                            newBottomBorder = tile.borders.bottom;
                            foundGrid = tile.grid;
                            foundId = id;
                            break;
                        case 'bottom':
                            rightBorder = tile.bordersReverse.right;
                            newBottomBorder = tile.borders.top;
                            foundId = id;
                            foundGrid = flipVertical(tile.grid);
                            break;
                    }
                }
            }

            for(let key in tile.bordersReverse) {
                let border = tile.bordersReverse[key];
                if(border === bottomBorder) {
                    switch(key) {
                        case 'left':
                            rightBorder = tile.borders.top;
                            newBottomBorder = tile.bordersReverse.right;
                            foundGrid = rotateRight(tile.grid);
                            foundId = id;
                            break;
                        case 'right':
                            rightBorder = tile.bordersReverse.top;
                            newBottomBorder = tile.bordersReverse.left;
                            foundGrid = flipHorizontal(rotateLeft(tile.grid));
                            foundId = id;
                            break;
                        case 'top':
                            rightBorder = tile.borders.left;
                            newBottomBorder = tile.bordersReverse.bottom;
                            foundGrid = flipHorizontal(tile.grid);
                            foundId = id;
                            break;
                        case 'bottom':
                            rightBorder = tile.bordersReverse.left;
                            newBottomBorder = tile.bordersReverse.top;
                            foundGrid = rotate180(tile.grid);
                            foundId = id;
                            break;
                    }
                }
            }
        });

        if(foundGrid) {
            tiles.delete(foundId);
            newLines = [...foundGrid];
            bottomBorder = newBottomBorder;
            go = true;
        }
    }

    let monsterBase = [
        {x: 0, y: 1},
        {x: 1, y: 2},
        {x: 4, y: 2},
        {x: 5, y: 1},
        {x: 6, y: 1},
        {x: 7, y: 2},
        {x: 10, y: 2},
        {x: 11, y: 1},
        {x: 12, y: 1},
        {x: 13, y: 2},
        {x: 16, y: 2},
        {x: 17, y: 1},
        {x: 18, y: 0},
        {x: 18, y: 1},
        {x: 19, y: 1},
    ];

    let monsters = [monsterBase];
    let monsterTransforms = [
        obj => ({x: 19 - obj.x, y: obj.y}),
        obj => ({x: obj.x, y: 2 - obj.y}),
        obj => ({x: 19 - obj.x, y: 2 - obj.y}),
        obj => ({x: obj.y, y: obj.x}),
        obj => ({x: 19 - obj.y, y: obj.x}),
        obj => ({x: obj.y, y: 2 - obj.x}),
        obj => ({x: 19 - obj.y, y: 2 - obj.x}),
    ];

    for(let transform of monsterTransforms) {
        let newMonster = [];
        for(let part of monsterBase) {
            newMonster.push(transform(part));
        }
        monsters.push(newMonster);
    }

    let foundMonsters = 0;

    for(let y = 0; y < mainGrid.length - 2; y++) {
        for(let x = 0; x < mainGrid[y].length - 2; x++) {
            for(let i = 0; i < monsters.length; i++) {
                let monster = monsters[i];
                let valid = true;
                for(let part of monster) {
                    let xx = x + part.x;
                    let yy = y + part.y;
                    if(!mainGrid[yy] || mainGrid[yy][xx] !== '#') {
                        valid = false;
                    }
                }
                if(valid) {
                    foundMonsters++;
                }
            }
        }
    }

    let roughCount = 0;
    for(let y = 0; y < mainGrid.length; y++) {
        for(let x = 0; x < mainGrid[y].length; x++) {
            if(mainGrid[y][x] === '#') {
                roughCount++;
            }
        }
    }

    console.log(roughCount - foundMonsters * 15);

}).catch((err) => {
    console.log(err, err.stack);
});