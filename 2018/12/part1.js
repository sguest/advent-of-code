let lib = require('../../lib');

let year = 2018;
let day = 12;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let initalLine = lines.shift();
    let initialState = initalLine.split(': ')[1].split('');

    let transitions = {};

    for(let line of lines) {
        let parts = line.split(' => ');
        transitions[parts[0]] = parts[1];
    }

    let state = initialState;
    let min = 0;
    let max = state.length;

    for(let gen = 0; gen < 20; gen++) {
        let newState = [];
        for(let i = min - 2; i < max + 2; i++) {
            let area = [];
            for(let j = i - 2; j <= i + 2; j++) {
                area = area.concat(state[j] || '.');
            }
            newState[i] = transitions[area.join('')] || '.';
        }
        min -= 2;
        max += 2;
        state = newState;
    }

    let sum = 0;
    for(let i = min; i < max; i++) {
        if(state[i] === '#') {
            sum += i;
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err.stack);
});