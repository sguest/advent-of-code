import { getInput } from '../../lib/index.ts';

let year = 2025;
let day = 8;

let data = await getInput(year, day);

type box = { x: number, y: number, z: number };

let boxes: box[] = []; 

let lines = data.split('\n');
for(let line of lines) {
    let parts = line.split(',');
    boxes.push({ x: +parts[0], y: +parts[1], z: +parts[2]});
}

type distance = { id1: number, id2: number, distance: number };
let distances: distance[] = [];

for(let i = 0; i < boxes.length - 1; i++) {
    let boxI = boxes[i];
    for(let j = i + 1; j < boxes.length; j++) {
        let boxJ = boxes[j];
        distances.push({ id1: i, id2: j, distance: Math.sqrt(Math.pow(boxI.x - boxJ.x, 2) + Math.pow(boxI.y - boxJ.y, 2) + Math.pow(boxI.z - boxJ.z, 2)) });
    }
}

distances.sort((a, b) => a.distance - b.distance);

type circuit = { ids: number[], original: number }

let circuits: {[key: string]: circuit } = {};

for(let i = 0; i < boxes.length; i++) {
    circuits[i] = { ids: [i], original: i };
}

for(let i = 0; i < distances.length; i++)
{
    let dist = distances[i];

    let oldCircuit = circuits[dist.id1];
    let newCircuit = circuits[dist.id2];
    for(let id of oldCircuit.ids) {
        circuits[id] = newCircuit;
    }
    for(let oldId of oldCircuit.ids) {
        if(!newCircuit.ids.includes(oldId))
        {
            newCircuit.ids.push(oldId);
        }
    }
    if(newCircuit.ids.length === boxes.length) {
        console.log(boxes[dist.id1].x * boxes[dist.id2].x);
        process.exit(0);
    }
}