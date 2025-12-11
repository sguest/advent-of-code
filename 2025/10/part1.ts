import { getInput, LinkedList } from '../../lib/index.ts';

let year = 2025;
let day = 10;

let data = await getInput(year, day);
type StateNode = {
    state: boolean[];
    pushes: number;
}

let lines = data.split('\n');
let count = 0;
for(let line of lines) {
    let parts = line.split(' ');
    parts.pop();
    let neededState = parts.shift()!.replace('[', '').replace(']', '').split('').map(x => x === '#');
    let buttons = parts.map(p => p.replace('(', '').replace(')', '').split(',').map(x => +x));
    let queue = new LinkedList<StateNode>();
    queue.push({ state: new Array(neededState.length).fill(false), pushes: 0 });
    let finished = false;
    while(!finished) {
        let current = queue.shift();
        for(let button of buttons) {
            let currentState = [...current.state];
            for(let light of button) {
                currentState[light] = !currentState[light];
            }
            let match = true;
            for(let i = 0; i < neededState.length; i++) {
                if(neededState[i] !== currentState[i]) {
                    match = false;
                }
            }
            if(match) {
                finished = true;
                count += current.pushes + 1;
            }
            else {
                queue.push({ state: currentState, pushes: current.pushes + 1});
            }
        }
    }
}
console.log(count);