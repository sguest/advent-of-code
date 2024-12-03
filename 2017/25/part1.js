let pointer = 0;
let state = 'A';
let count = 0;
let tape = [];

let output = {
    A: { 0: 1, 1: 0 },
    B: { 0: 0, 1: 0},
    C: { 0: 1, 1: 1},
    D: { 0: 0, 1: 0},
    E: { 0: 0, 1: 1},
    F: { 0: 1, 1: 1},
}

let move = {
    A: { 0: 1, 1: -1},
    B: { 0: 1, 1: 1},
    C: { 0: -1, 1: 1},
    D: { 0: -1, 1: -1},
    E:{ 0: 1, 1: 1},
    F: {0: -1, 1: 1}
}

let nextState = {
    A: { 0: 'B', 1: 'F'},
    B: {0: 'C', 1: 'D'},
    C: {0: 'D', 1: 'E'},
    D: {0: 'E', 1: 'D'},
    E: {0: 'A', 1: 'C'},
    F:{ 0: 'A', 1: 'A'}
}

let min = 0;
let max = 0;

for(let it = 0; it < 12794428; it++) {
    let current = tape[pointer] || 0;
    tape[pointer] = output[state][current];
    if(output[state][current] === 1 && current === 0) {
        count++;
    } 
    else if(output[state][current] === 0 && current === 1) {
        count--;
    }
    pointer += move[state][current];
    min = Math.min(pointer, min);
    max = Math.max(pointer, max);
    state = nextState[state][current];
}

console.log(count);