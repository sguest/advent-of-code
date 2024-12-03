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

    let winning = {
        rock: 'paper',
        scissors: 'rock',
        paper: 'scissors',
    }

    let score = 0;
    for(let line of lines) {
        let parts = line.split(' ');

        let opponentMove = opponentMoves[parts[0]];

        let myMove;
        if(parts[1] === 'Y')  {
            myMove = opponentMove;
            score += 3;
        }
        else if(parts[1] === 'Z') {
            score += 6;
            myMove = winning[opponentMove];
        }
        else {
            for(let key in winning) {
                if(winning[key] === opponentMove) {
                    myMove = key;
                }
            }
        }

        score += shapeScores[myMove];
    }
    
    console.log(score);
}).catch((err) => {
    console.log(err, err.stack);
});