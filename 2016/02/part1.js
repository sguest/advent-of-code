let lib = require('../../lib');

lib.getInput(2016, 2).then((data) => {
    var current = {x: 1, y: 1};
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

            if(target.x >=0 && target.x <= 2 && target.y >= 0 && target.y <= 2) {
                current = target;
            }
        }

        code += (current.x + current.y * 3 + 1);
    }

    console.log(code);
});