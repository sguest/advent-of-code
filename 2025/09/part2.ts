import { getInput } from '../../lib/index.ts';

let year = 2025;
let day = 9;

let data = await getInput(year, day);

type Point = { x: number, y: number };
type Edge = { x1: number, y1: number, x2: number, y2: number };

let points: Point[] = [];
let edges: Edge[] = [];

let lines = data.split('\n');
for(let line of lines) {
    let parts = line.split(',');
    points.push({ x: +parts[0], y: +parts[1] });
}

const addEdge = (a: Point, b: Point) => {
    edges.push({ x1: Math.min(a.x, b.x), y1: Math.min(a.y, b.y), x2: Math.max(a.x, b.x), y2: Math.max(a.y, b.y )});
}

for(let i = 0; i < points.length - 1; i++) {
    addEdge(points[i], points[i + 1]);
}
addEdge(points[0], points.at(-1)!);

let maxArea = 0;
for(let i = 0; i < points.length - 1; i++) {
    let pointI = points[i];
    for(let j = i + 1; j < points.length; j++) {
        let pointJ = points[j];
        let area = (Math.abs(pointI.x - pointJ.x) + 1) * (Math.abs(pointI.y - pointJ.y) + 1);
        if(area > maxArea) {
            let minX = Math.min(pointI.x, pointJ.x);
            let maxX = Math.max(pointI.x, pointJ.x);
            let minY = Math.min(pointI.y, pointJ.y);
            let maxY = Math.max(pointI.y, pointJ.y);
            let intersect = false;
            for(let edge of edges) {
                if(edge.x1 < maxX && edge.x2 > minX && edge.y1 < maxY && edge.y2 > minY) {
                    intersect = true;
                }
            }
            if(!intersect) {
                maxArea = area;
            }
        }
    }
}

console.log(maxArea);
