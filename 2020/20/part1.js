let lib = require('../../lib');

let year = 2020;
let day = 20;

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

    tiles.forEach(tile => {
        let borders = [];
        borders.push(tile.grid[0]);
        borders.push(tile.grid[tile.grid.length - 1]);
        let left = '';
        let right = '';
        tile.grid.forEach(line => {
            left += line[0];
            right += line[line.length - 1];
        })
        borders.push(left);
        borders.push(right);
        tile.borders = borders;
        tile.bordersReverse = borders.slice(0).map(x => [...x].reverse().join(''));
    });

    let corners = [];
    tiles.forEach((tile, id) => {
        let matchCount = 0;
        tile.borders.forEach(border => {
            let found = false;
            tiles.forEach(otherTile => {
                if(tile !== otherTile) {
                    otherTile.borders.forEach(otherBorder => {
                        if(otherBorder === border) {
                            found = true;
                        }
                    });
                    otherTile.bordersReverse.forEach(otherBorder => {
                        if(otherBorder === border) {
                            found = true;
                        }
                    });
                }
            });
            if(found) {
                matchCount++;
            }
        });
        if(matchCount === 2) {
            corners.push(id);
        }
    });

    console.log(corners.reduce((x, y) => x * y));
}).catch((err) => {
    console.log(err, err.stack);
});