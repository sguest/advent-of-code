let lib = require('../../lib');

let year = 2021;
let day = 21;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let spaces = [];
    for(let line of lines) {
        spaces.push(+(line.split(': ')[1]));
    }

    let scores = [0, 0];
    let roll = 1;
    let rollCount = 0;
    let turn = 1;

    while(scores[0] < 1000 && scores[1] < 1000)
    {
        turn = (turn + 1) % 2;
        let turnRoll = 0;
        rollCount += 3;
        for(let i = 0; i < 3; i++) {
            turnRoll += roll;
            roll++;
            if(roll > 100) {
                roll = 1;
            }
        }
        spaces[turn] += turnRoll;

        while(spaces[turn] > 10) {
            spaces[turn] -= 10;
        }
        scores[turn] += spaces[turn];
    }

    let losingScore = 0;
    if(scores[0] >= 1000) {
        losingScore = scores[1];
    }
    else {
        losingScore = scores[0];
    }

    console.log(rollCount * losingScore);
}).catch((err) => {
    console.log(err, err.stack);
});