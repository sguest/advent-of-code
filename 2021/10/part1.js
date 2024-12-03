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
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    }
    let score = 0;
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
                    score += scores[char];
                }
            }
        }
    }
    console.log(score);
}).catch((err) => {
    console.log(err, err.stack);
});