let lib = require('../../lib');

let year = 2021;
let day = 21;

function getStateString(state) {
    return `${state.spaces[0]},${state.spaces[1]},${state.scores[0]},${state.scores[1]},${state.turn}`;
}

let rollCounts = {
    3: 1,
    4: 3,
    5: 6,
    6: 7,
    7: 6,
    8: 3,
    9: 1,
};

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let spaces = [];
    for(let line of lines) {
        spaces.push(+(line.split(': ')[1]));
    }

    let initialState = {
        spaces,
        scores: [0, 0],
        turn: 0,
    };

    let initialStateString = getStateString(initialState);
    let queues = [];
    queues[0] = {}
    queues[0][initialStateString] = 1;

    let victories = [0, 0];

    for(let counter = 0; counter <= 40; counter++) {
        let currentMap = queues[counter] || {};
        let keys = Object.keys(currentMap);
        while(keys.length > 0) {
            let currentStateString = keys[0];
            let currentCount = currentMap[currentStateString] || 1;
            let parts = currentStateString.split(',');
            let state = {
                spaces: [+parts[0], +parts[1]],
                scores: [+parts[2], +parts[3]],
                turn: +parts[4],
            }
            let nextTurn = (state.turn + 1) % 2;

            for(let key in rollCounts) {
                let scores = state.scores.slice(0);
                let spaces = state.spaces.slice(0);
                let roll = +key;
                let turn = state.turn;
                let count = rollCounts[key] * currentCount;
                spaces[turn] += roll;
                if(spaces[turn] > 10) {
                    spaces[turn] -= 10;
                }
                scores[turn] += spaces[turn];
                if(scores[turn] >= 21) {
                    victories[turn] += count;
                }
                else {
                    let newState = {
                        spaces,
                        scores,
                        turn: nextTurn,
                    };
                    let newStateString = getStateString(newState);
                    let totalScore = scores[0] + scores[1];
                    queues[totalScore] = queues[totalScore] || {};
                    let existingCount = queues[totalScore][newStateString] || 0;
                    queues[totalScore][newStateString] = existingCount + count; 
                }
            }

            delete currentMap[currentStateString];
            keys = Object.keys(currentMap);
        }
    }

    console.log(Math.max(...victories));
}).catch((err) => {
    console.log(err, err.stack);
});