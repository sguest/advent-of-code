let lib = require('../../lib');

let year = 2022;
let day = 2;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let shapeScores = {
        rock: 1,
        paper: 2,
        scissors: 3,
    };

    let opponentMoves = {
        A: 'rock',
        B: 'paper',
        C: 'scissors',
    };

    let myMoves = {
        X: 'rock',
        Y: 'paper',
        Z: 'scissors'
    }

    let score = 0;
    for(let line of lines) {
        let parts = line.split(' ');

        let myMove = myMoves[parts[1]];
        let opponentMove = opponentMoves[parts[0]];

        score += shapeScores[myMove];

        if(myMove === opponentMove) {
            score += 3;
        }
        else {
            if(opponentMove === 'rock' && myMove === 'paper') {
                score += 6;
            }
            if(opponentMove === 'paper' && myMove === 'scissors') {
                score += 6;
            }
            if(opponentMove === 'scissors' && myMove === 'rock') {
                score += 6;
            }
        }
    }
    
    console.log(score);
}).catch((err) => {
    console.log(err, err.stack);
});