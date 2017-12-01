var fs = require('fs');

var houses = [];
function addHouse(x, y) {
    if(!houses[x]) {
        houses[x] = [];
    }

    houses[x][y] = true;
}

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var current = {x: 0, y:0};
    var houseCount = 1;
    addHouse(0, 0);
    var delta = {
        '<': {x: -1, y: 0},
        '>': {x: 1, y: 0},
        '^': {x: 0, y: -1},
        'v': {x: 0, y: 1}
    }

    for(var direction of data) {
        var move = delta[direction];
        current.x += move.x;
        current.y += move.y;

        if(!houses[current.x] || !houses[current.x][current.y]) {
            houseCount++;
        }
        addHouse(current.x, current.y);
    }

    console.log(houseCount);
});