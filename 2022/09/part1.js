let lib = require('../../lib');

let year = 2022;
let day = 9;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };
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
            head.x += delta.x;
            head.y += delta.y;
            if(Math.abs(head.x - tail.x) >= 2) {
                if(head.x > tail.x) {
                    tail.x++;
                }
                else {
                    tail.x--;
                }
                tail.y = head.y;
            }
            else if(Math.abs(head.y - tail.y) >= 2) {
                if(head.y > tail.y) {
                    tail.y++;
                }
                else {
                    tail.y--;
                }
                tail.x = head.x;
            }

            visited[tail.x] = visited[tail.x] || [];
            if(!visited[tail.x][tail.y]) {
                visited[tail.x][tail.y] = true;
                count++;
            }
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});