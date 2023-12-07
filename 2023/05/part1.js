let lib = require('../../lib');

let year = 2023;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let seeds = lines[0].split(' ').map(x => +x);
    seeds.shift();
    let current = seeds;
    let i = 1;
    while(i < lines.length) {
        let next = [];
        i += 2;
        while(lines[i]) {
            let parts = lines[i].split(' ');
            let destStart = +parts[0];
            let sourceStart = +parts[1];
            let range = +parts[2];

            for(let curr of current) {
                if(curr >= sourceStart && curr <= sourceStart + range) {
                    next.push((curr - sourceStart) + destStart );
                }
            }
            i++;
        }
        current = next;
    }
    console.log(Math.min(...current));
}).catch((err) => {
    console.log(err, err.stack);
});