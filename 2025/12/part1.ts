import { getInput } from '../../lib/index.ts';

let year = 2025;
let day = 12;

let data = await getInput(year, day);

let lines = data.split('\n');

let count = 0;

// Apparently today is a troll and no present-tetris is needed. Just check if the presents will fit when arranged in a grid.
for(let line of lines) {
    if(line.includes('x')) {
        let [areaString, presentString] = line.split(': ');
        let [width, height] = areaString.split('x').map(x => +x);
        let presentCounts = presentString.split(' ').map(x => +x);
        let numPresents = presentCounts.reduce((a, b) => a + b);
        let neededArea = numPresents * 9;
        width -= width % 3;
        height -= height % 3;
        let totalArea = width * height;
        if(totalArea >= neededArea) {
            count++;
        }
    }
}

console.log(count);