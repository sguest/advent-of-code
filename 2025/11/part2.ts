import { getInput, memoize } from '../../lib/index.ts';

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

const findPaths = memoize((start: string, end: string) => {
    let paths = 0;

    if(start !== 'out')
    {
        for(let connection of connections[start]) {
            if(connection === end) {
                paths++;
            }
            else
            {
                paths += findPaths(connection, end);
            }
        }
    }

    return paths;
});

console.log(
    findPaths('svr', 'fft') * findPaths('fft', 'dac') * findPaths('dac', 'out') +
    findPaths('svr', 'dac') * findPaths('dac', 'fft') * findPaths('fft', 'out')
);