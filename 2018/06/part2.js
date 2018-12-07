let lib = require('../../lib');

let year = 2018;
let day = 6;

function getDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let areas = [];
    for(let line of lines) {
        let parts = line.split(', ');
        areas.push({x: +parts[0], y: +parts[1]});
    }

    let minX = Math.min.apply(null, areas.map(a => a.x));
    let minY = Math.min.apply(null, areas.map(a => a.y));
    let maxX = Math.max.apply(null, areas.map(a => a.x));
    let maxY = Math.max.apply(null, areas.map(a => a.y));

    let middleX = Math.floor((minX + maxX) / 2);
    let middleY = Math.floor((minY + maxY) / 2);

    let path = [{x: middleX, y: middleY}];
    let visited = {};
    let count = 0;

    while(path.length) {
        let current = path.pop();
        if(!visited[current.x + ',' + current.y]) {
            visited[current.x + ',' + current.y] = true;

            let totalDistance = areas.map(a => getDistance(a, current)).reduce((a, b) => a + b);

            if(totalDistance < 10000) {
                path.push({x:current.x - 1, y:current.y});
                path.push({x:current.x + 1, y:current.y});
                path.push({x:current.x, y:current.y - 1});
                path.push({x:current.x, y:current.y + 1});
                count++;
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err.stack);
});