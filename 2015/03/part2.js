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
    var roboCurrent = {x: 0, y: 0};
    var santaTurn = true;

    var houseCount = 1;
    addHouse(0, 0);
    var delta = {
        '<': {x: -1, y: 0},
        '>': {x: 1, y: 0},
        '^': {x: 0, y: -1},
        'v': {x: 0, y: 1}
    }

    for(var direction of data) {
        var mover;

        if(santaTurn) {
            mover = current;
        }
        else {
            mover = roboCurrent;
        }
        var move = delta[direction];
        mover.x += move.x;
        mover.y += move.y;

        if(!houses[mover.x] || !houses[mover.x][mover.y]) {
            houseCount++;
        }
        addHouse(mover.x, mover.y);
        santaTurn = !santaTurn;
    }

    console.log(houseCount);
});