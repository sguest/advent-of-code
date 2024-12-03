let lib = require('../../lib');

let year = 2021;
let day = 9;

function get(lines, x, y) {
    if(!lines[x]) {
        return Infinity;
    }
    if(lines[x][y] === undefined) {
        return Infinity
    }
    return +lines[x][y];
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let basins = [];
    for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        for(let j = 0; j < line.length; j++) {
            let val = +line[j];
            if(get(lines, i-1, j) > val && get(lines, i+1, j) > val && get(lines, i, j-1) > val && get(lines, i, j+1) > val) {
                basins.push({i, j});
            }
        }
    }

    let sizes = [];
    for(let basin of basins) {
        let queue = new lib.linkedList();
        let visited = [];
        queue.push(basin);
        let size = 0;
        while(queue.any()) {
            let current = queue.shift();
            for(let pair of [{i: current.i - 1, j: current.j}, {i: current.i + 1, j: current.j}, {i: current.i, j: current.j - 1}, {i: current.i, j: current.j + 1}])
            {
                if(get(lines, pair.i, pair.j) < 9) {
                    visited[pair.i] = visited[pair.i] || [];
                    if(!visited[pair.i][pair.j]) {
                        size ++;
                        queue.push(pair);
                        visited[pair.i][pair.j] = true;
                    }
                }
            }
        }
        sizes.push(size);
    }

    sizes.sort((a, b) => b - a);
    console.log(sizes[0] * sizes[1] * sizes[2]);
}).catch((err) => {
    console.log(err, err.stack);
});