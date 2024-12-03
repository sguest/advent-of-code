let lib = require('../../lib');

let year = 2017;
let day = 6;

lib.getInput(year, day).then((data) => {
    let blocks = data.split(/\s/).map((s) => parseInt(s, 10));
    let steps = 0;
    let visited = {};
    
    while(true) {
        let state = blocks.join(',');
        if(visited[state]) {
            break;
        }
        steps++;
        visited[state] = true;

        let max = 0;
        let chosen = 0;

        for(let index = 0; index < blocks.length; index++) {
            if(blocks[index] > max) {
                max = blocks[index];
                chosen = index;
            }
        }

        blocks[chosen] = 0;

        while(max > 0) {
            chosen = (chosen + 1) % blocks.length;
            max--;
            blocks[chosen]++;
        }
    }

    console.log(steps);
});