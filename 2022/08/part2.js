let lib = require('../../lib');

let year = 2022;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let trees = [];
    let visible = [];
    for(let line of lines) {
        trees.push(line.split('').map(x => +x));
        visible.push([]);
    }

    let deltas = [{x: 0, y: 1}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: -1}];
    let best = 0;
    for(let x = 1; x < trees.length - 1; x++) {
        for(let y = 1; y < trees[x].length - 1; y++) {
            let score = 1;

            for(let delta of deltas) {
                let current = {x, y};
                current.x += delta.x;
                current.y += delta.y;
                let distance = 1;

                while(current.x > 0 && current.x < trees.length - 1 && current.y > 0 && current.y < trees[x].length - 1 && trees[current.x][current.y] < trees[x][y]) {
                    distance ++;
                    current.x += delta.x;
                    current.y += delta.y;
                }

                score *= distance;
            }

            best = Math.max(best, score);
        }
    }

    console.log(best);
}).catch((err) => {
    console.log(err, err.stack);
});