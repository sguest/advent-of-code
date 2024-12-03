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

    let candidates = [];

    for(let area1 of areas) {
        let topBound = false;
        let bottomBound = false;
        let leftBound = false;
        let rightBound = false;

        for(let area2 of areas) {
            if(area2.x < area1.x && Math.abs(area1.y - area2.y) <= Math.abs(area1.x - area2.x)) {
                leftBound = true;
            }
            if(area2.x > area1.x && Math.abs(area1.y - area2.y) <= Math.abs(area1.x - area2.x)) {
                rightBound = true;
            }
            if(area2.y < area1.y && Math.abs(area1.y - area2.y) >= Math.abs(area1.x - area2.x)) {
                topBound = true;
            }
            if(area2.y > area1.y && Math.abs(area1.y - area2.y) >= Math.abs(area1.x - area2.x)) {
                bottomBound = true;
            }
        }
        if(leftBound && rightBound && topBound && bottomBound) {
            candidates.push(area1);
        }
    }

    let maxArea = 0;

    for(let candidate of candidates) {
        let path = [{x: candidate.x, y: candidate.y}];
        let count = 0;
        let visited = {};

        main: while(path.length) {
            let current = path.pop();
            if(!visited[current.x+','+current.y]) {
                visited[current.x+','+current.y] = true;
                let distance = getDistance(current, candidate);

                for(let area of areas) {

                    if(area !== candidate) {
                        let distance2 = getDistance(current, area);

                        if(distance >= distance2) {
                            continue main;
                        }
                    }
                }

                count++;

                path.push({x:current.x - 1, y:current.y});
                path.push({x:current.x + 1, y:current.y});
                path.push({x:current.x, y:current.y - 1});
                path.push({x:current.x, y:current.y + 1});
            }
        }
        if(count > maxArea) {
            maxArea = count;
        }

    }

    console.log(maxArea);
}).catch((err) => {
    console.log(err.stack);
});