let lib = require('../../lib');

let year = 2018;
let day = 14;

lib.getInput(year, day).then((data) => {
    let target = +data;

    let scores = [3, 7];
    let indexes = [0, 1];

    while(scores.length < target + 10) {
        for(let elfNum = 0; elfNum < 2; elfNum++) {
            let currentIndex = indexes[elfNum];
            let currentScore = scores[currentIndex];
            currentIndex = (currentIndex + 1 + currentScore) % scores.length;
            indexes[elfNum] = currentIndex;
        }

        let totalScore = scores[indexes[0]] + scores[indexes[1]];

        if(totalScore >= 10) {
            scores.push(1);
        }
        scores.push(totalScore % 10);
    }

    let result = '';
    for(let i = target; i < target + 10; i++) {
        result += scores[i];
    }

    console.log(result);
}).catch((err) => {
    console.log(err.stack);
});