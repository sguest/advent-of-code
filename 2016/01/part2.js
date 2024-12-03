var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var facing = 'N';

    var turns = {
        'NL': 'W',
        'NR': 'E',
        'SL': 'E',
        'SR': 'W',
        'WR': 'N',
        'WL': 'S',
        'ER': 'S',
        'EL': 'N'
    }

    var visited = [];
    visited[0] = [];
    visited[0][0] = true;

    var position = {x: 0, y:0};

    var delta = {
        'N': {x: 0, y: -1},
        'S': {x: 0, y: 1},
        'W': {x: -1, y: 0},
        'E': {x: 1, y:0}
    }

    outer:
    for(var step of data.split(', ')) {
        facing = turns[facing + step[0]];
        var distance = parseInt(step.substring(1), 10);
        currentDelta = delta[facing];
        for(var i = 0; i < distance; i++) {
            position.x += currentDelta.x;
            position.y += currentDelta.y;

            if(!visited[position.x]) {
                visited[position.x] = [];
            }

            if(visited[position.x][position.y]) {
                console.log(Math.abs(position.x) + Math.abs(position.y));
                break outer;
            }

            visited[position.x][position.y] = true;
        }
    }
});