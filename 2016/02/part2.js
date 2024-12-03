let lib = require('../../lib');

lib.getInput(2016, 2).then((data) => {
    var current = {x: 0, y: 2};
    var keypad = [[,,1],[,2,3,4],[5,6,7,8,9],[,'A','B','C'],[,,'D']]
    var delta = {
        'L': {x: -1, y: 0},
        'R': {x: 1, y: 0},
        'U': {x: 0, y: -1},
        'D': {x: 0, y: 1}
    }

    var code = '';

    for(var line of data.trim().split('\n')) {
        for(var step of line) {
            var currentDelta = delta[step];
            var target = {
                x: current.x + currentDelta.x,
                y: current.y + currentDelta.y
            };

            if(keypad[target.y] && keypad[target.y][target.x]) {
                current = target;
            }
        }

        code += keypad[current.y][current.x];
    }

    console.log(code);
});