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
    let max = state.length;

    let repeatCount = 0;
    let lastSum = 0;
    let lastDifference = 0;
    let genCount = 0;

    while(repeatCount < 5) {
        genCount++;
        let newState = [];
        for(let i = -4; i < max + 2; i++) {
            let area = [];
            for(let j = i - 2; j <= i + 2; j++) {
                area = area.concat(state[j] || '.');
            }
            newState[i] = transitions[area.join('')] || '.';
        }
        max += 1;
        state = newState;
        let sum = 0;
        for(let i = 0; i < max; i++) {
            if(state[i] === '#') {
                sum += i;
            }
        }

        let currentDifference = sum - lastSum;
        if(currentDifference === lastDifference) {
            repeatCount ++;
        }
        else {
            repeatCount = 0;
            lastDifference = currentDifference;
        }
        lastSum = sum;
    }

    let gensRemaining = 50000000000 - genCount;

    lastSum += gensRemaining * lastDifference;

    console.log(lastSum);
}).catch((err) => {
    console.log(err.stack);
});