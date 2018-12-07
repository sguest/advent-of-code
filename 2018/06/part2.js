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

    let minX = Infinity;
    let minY = Infinity;
    let maxX = 0;
    let maxY = 0;

    for(let area of areas) {
        minX = Math.min(minX, area.x);
        minY = Math.min(minY, area.y);
        maxX = Math.max(maxX, area.x);
        maxY = Math.max(maxY, area.y);
    }

    let count = 0;
    for(let x = minX - 1; x < maxX + 1; x++) {
        for(let y = minY - 1; y < maxY + 1; y++) {
            let totalDistance = 0;
            for(let area of areas) {
                totalDistance += getDistance(area, {x, y});
            }

            if(totalDistance < 10000) {
                count++;
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err.stack);
});