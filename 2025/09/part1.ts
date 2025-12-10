import { getInput } from '../../lib/index.ts';

let year = 2025;
let day = 9;

let data = await getInput(year, day);

type point = { x: number, y: number };

let points: point[] = [];

let lines = data.split('\n');
for(let line of lines) {
    let parts = line.split(',');
    points.push({ x: +parts[0], y: +parts[1] });
}

let maxArea = 0;
for(let i = 0; i < points.length - 1; i++) {
    let pointI = points[i];
    for(let j = i + i; j < points.length; j++) {
        let pointJ = points[j];
        let area = (Math.abs(pointI.x - pointJ.x) + 1) * (Math.abs(pointI.y - pointJ.y) + 1);
        maxArea = Math.max(area, maxArea);
    }
}

console.log(maxArea);
