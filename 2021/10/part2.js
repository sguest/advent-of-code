let lib = require('../../lib');

let year = 2021;
let day = 10;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let pairs = {
        '(': ')',
        '[': ']',
        '{': '}',
        '<': '>',
    }
    let scores = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    }
    let lineScores = [];
    for(let line of lines) {
        let expectedClosing = [pairs[line[0]]];
        let valid = true;
        let i = 0;
        while(valid && i < line.length - 1) {
            i++;
            let char = line[i];
            if(pairs[char]) {
                expectedClosing.push(pairs[char]);
            }
            else {
                let expected = expectedClosing.pop();
                if(char !== expected) {
                    valid = false;
                }
            }
        }

        let lineScore = 0;
        if(valid) {
            while(expectedClosing.length) {
                lineScore = lineScore * 5 + scores[expectedClosing.pop()];
            }
            lineScores.push(lineScore);
        }
    }
    lineScores = lineScores.sort((a, b) => a - b);
    console.log(lineScores[Math.floor(lineScores.length / 2)]);
}).catch((err) => {
    console.log(err, err.stack);
});