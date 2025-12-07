import { getInput } from '../../lib/index.ts';

let year = {{year}};
let day = {{day}};

let data = await getInput(year, day);

let lines = data.split('\n');
for(let line of lines) {
    
}
