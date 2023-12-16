let lib = require('../../lib');

let year = 2023;
let day = 16;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let deltas = {
        L: { x: -1, y: 0 },
        R: { x: 1, y: 0 },
        U: { x: 0, y: -1 },
        D: { x: 0, y: 1 },
    }

    function calc(startX, startY, startDir) {
        let beams = [{ x: startX, y: startY, dir: startDir}];
        let count = 1;
        let hit = { };
        hit[`${startX},${startY}`] = [startDir];

        while(beams.length) {
            let newBeams = [];
            for(let beam of beams) {
                let stepBeams = [beam];
                switch(lines[beam.y][beam.x]) {
                    case '/':
                        switch(beam.dir) {
                            case 'U':
                                beam.dir = 'R';
                                break;
                            case 'D':
                                beam.dir = 'L';
                                break;
                            case 'R':
                                beam.dir = 'U';
                                break;
                            case 'L':
                                beam.dir = 'D';
                                break;
                        }
                        break;
                    case '\\':
                        switch(beam.dir) {
                            case 'U':
                                beam.dir = 'L';
                                break;
                            case 'D':
                                beam.dir = 'R';
                                break;
                            case 'R':
                                beam.dir = 'D';
                                break;
                            case 'L':
                                beam.dir = 'U';
                                break;
                        }
                        break;
                    case '-':
                        if(beam.dir === 'U' || beam.dir === 'D') {
                            beam.dir = 'R';
                            stepBeams.push({ x: beam.x, y: beam.y, dir: 'L'})
                        }
                        break;
                    case '|':
                        if(beam.dir === 'R' || beam.dir === 'L') {
                            beam.dir = 'U';
                            stepBeams.push({ x: beam.x, y: beam.y, dir: 'D'})
                        }
                        break;
                }

                for(let s of stepBeams) {
                    let delta = deltas[s.dir];
                    s.x += delta.x;
                    s.y += delta.y;

                    if(s.x >=0 && s.y >= 0 && s.x < lines[0].length && s.y < lines.length) {
                        let key = `${s.x},${s.y}`

                        if(!hit[key]) {
                            hit[key] = [];
                            count++;
                        }
                        if(hit[key].indexOf(s.dir) === -1) {
                            hit[key].push(s.dir);
                            newBeams.push(s);
                        }
                    }
                }
            }
            beams = newBeams;
        }

        return count;
    }

    let best = 0;

    for(let x = 0; x < lines[0].length; x++) {
        best = Math.max(best, calc(x, 0, 'D'));
        best = Math.max(best, calc(x, lines.length - 1, 'U'));
    }

    for(let y = 0; y < lines.length; y++) {
        best = Math.max(best, calc(0, y, 'R'));
        best = Math.max(best, calc(lines[0].length - 1, y, 'L'));
    }

    console.log(best);
}).catch((err) => {
    console.log(err, err.stack);
});