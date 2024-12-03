let md5 = require('md5');
let lib = require('../../lib');

lib.getInput(2016, 17).then((input) => {
    let queue = [{path: '', x: 0, y: 0}];

    while(queue.length) {
        let current = queue.shift();
        if(current.x === 3 && current.y === 3) {
            console.log(current.path);
            break;
        }
        let state = md5(input + current.path);
        if(current.y > 0 && parseInt(state[0], 16) >= 11) {
            queue.push({path: current.path + 'U', x: current.x, y: current.y - 1});
        }
        if(current.y < 3 && parseInt(state[1], 16) >= 11) {
            queue.push({path: current.path + 'D', x: current.x, y: current.y + 1});
        }
        if(current.x > 0 && parseInt(state[2], 16) >= 11) {
            queue.push({path: current.path + 'L', x: current.x - 1, y: current.y});
        }
        if(current.x < 3 && parseInt(state[3], 16) >= 11) {
            queue.push({path: current.path + 'R', x: current.x + 1, y: current.y});
        }
    }
});