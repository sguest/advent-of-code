import { getInput, LinkedList } from '../../lib/index.ts';

let year = 2025;
let day = 11;

let data = await getInput(year, day);

let connections: { [key: string] : string[] } = {};

let lines = data.split('\n');
for(let line of lines) {
    let [source, dest] = line.split(': ');
    let destinations = dest.split(' ');
    connections[source] = destinations;
}

type State = {
    at: string;
};

let queue = new LinkedList<State>();
queue.push({ at: 'you'});

let count = 0;
while(queue.any()) {
    let current = queue.shift();
    for(let destination of connections[current.at]) {
        if(destination == 'out') {
            count++;
        }
        else {
            queue.push({at: destination});
        }
    }
}

console.log(count);
