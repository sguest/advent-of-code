let lib = require('../../lib');

let year = 2018;
let day = 14;

let scores = new lib.linkedList();
let candidates = new lib.linkedList();
let target;

function addScore(score) {
    for(let candidateNode of candidates.getNodes()) {
        let candidate = candidateNode.value;

        if(score === candidate.next) {
            candidate.count++;
            if(candidate.count === target.length) {
                console.log(candidate.startIndex);
                process.exit(0);
            }
            else {
                candidate.next = target[candidate.count];
            }
        }
        else {
            candidates.removeNode(candidateNode);
        }
    }

    if(score === target[0]) {
        candidates.push({
            next: target[1],
            startIndex: scores.length,
            count: 1
        })
    }

    scores.push(score);
}

lib.getInput(year, day).then((data) => {
    target = data.split('').map(s => +s);

    let elves = [];
    elves.push(scores.push(3));
    elves.push(scores.push(7));

    while(true) {
        let totalScore = 0;
        for(let elfNum = 0; elfNum < 2; elfNum++) {
            let steps = elves[elfNum].value + 1;
            for(let step = 0; step < steps; step++) {
                elves[elfNum] = scores.nextNode(elves[elfNum], true);
            }
            totalScore += elves[elfNum].value;
        }

        if(totalScore >= 10) {
            addScore(1);
        }
        addScore(totalScore % 10);
    }
}).catch((err) => {
    console.log(err.stack);
});