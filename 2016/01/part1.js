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

    var position = {x: 0, y:0};

    var delta = {
        'N': {x: 0, y: -1},
        'S': {x: 0, y: 1},
        'W': {x: -1, y: 0},
        'E': {x: 1, y:0}
    }

    for(var step of data.split(', ')) {
        facing = turns[facing + step[0]];
        var distance = parseInt(step.substring(1), 10);
        currentDelta = delta[facing];
        position.x += currentDelta.x * distance;
        position.y += currentDelta.y * distance;
    }

    console.log(position.x + position.y);
});