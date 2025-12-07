import { getInput } from '../../lib/index.ts';

let year = 2025;
let day = 7;

let data = await getInput(year, day);

let lines = data.split('\n');
let first = lines.shift()!;
let x = first.indexOf('S');
let beams: {[key: number]: number} = {[x]: 1};
for(let line of lines) {
    let nextBeams: {[key: number]: number} = {};
    let newIndices: number[] = [];
    for(let beam in beams) {
        if(line[beam] === '.') {
            newIndices = [+beam];
        }
        else
        {
            newIndices = [+beam - 1, +beam + 1];
        }

        let count = beams[beam];
        for(let index of newIndices) {
            nextBeams[index] ||= 0;
            nextBeams[index] += count;
        }
    }
    beams = nextBeams;
}

let total = 0;

for(let beam in beams) {
    total += beams[beam];
}

console.log(total);
