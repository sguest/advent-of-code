import { getInput } from '../../lib/index.ts';

let year = 2025;
let day = 7;

let data = await getInput(year, day);

let lines = data.split('\n');
let first = lines.shift()!;
let x = first.indexOf('S');
let beams = [x];
let splits = 0;
for(let line of lines) {
    let nextBeams: number[] = [];
    for(let beam of beams) {
        let newBeams: number[] = [];
        if(line[beam] === '.') {
            newBeams = [beam];
        }
        else
        {
            newBeams = [beam - 1, beam + 1];
            splits++;
        }

        for(let newBeam of newBeams) {
            if(!nextBeams.includes(newBeam)) {
                nextBeams.push(newBeam);
            }
        }
    }
    beams = nextBeams;
}

console.log(splits);
