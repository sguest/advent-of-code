let lib = require('../../lib');

let year = 2022;
let day = 9;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let segments = [];
    for(let i = 0; i < 10; i++) {
        segments.push({ x: 0, y: 0 });
    }
    let deltas = { U: { x: 0, y: -1 }, D: { x: 0, y: 1 }, R: { x: 1, y: 0 }, L: { x: -1, y: 0 }};
    let visited = [];
    visited[0] = [];
    visited[0][0] = true;
    let count = 1;
    for(let line of lines) {
        let parts = line.split(' ');
        let direction = parts[0];
        let delta = deltas[direction];
        let amount = +parts[1];

        for(let i = 0; i < amount; i++) {
            segments[0].x += delta.x;
            segments[0].y += delta.y;

            for(let i = 1; i < 10; i++) {
                let prev = segments[i - 1];
                let current = segments[i];
                if(Math.abs(prev.x - current.x) >= 2) {
                    if(prev.x > current.x) {
                        current.x++;
                    }
                    else {
                        current.x--;
                    }
                    if(prev.y > current.y) {
                        current.y++;
                    }
                    else if(prev.y < current.y) {
                        current.y--;
                    }
                }
                else if(Math.abs(prev.y - current.y) >= 2) {
                    if(prev.y > current.y) {
                        current.y++;
                    }
                    else {
                        current.y--;
                    }
                    if(prev.x > current.x) {
                        current.x++;
                    }
                    else if(prev.x < current.x) {
                        current.x--;
                    }
                }
            }

            visited[segments[9].x] = visited[segments[9].x] || [];
            if(!visited[segments[9].x][segments[9].y]) {
                visited[segments[9].x][segments[9].y] = true;
                count++;
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});