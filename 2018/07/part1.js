let lib = require('../../lib');

let year = 2018;
let day = 7;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let steps = {};
    for(let line of lines) {
        let parts = line.split(' ');
        let first = parts[1];
        let second = parts[7];

        if(!steps[first]) {
            steps[first] = {prev: []};
        }
        if(!steps[second]) {
            steps[second] = {prev:[]};
        }

        steps[second].prev.push(first);
    }

    let result = '';
    let cont = true;
    while(cont) {
        cont = false;
        let candidates = [];

        for(let step in steps) {
            let info = steps[step];

            if(!info.marked) {
                let satisfied = true;
                for(let prevStep of info.prev) {
                    if(result.indexOf(prevStep) === -1) {
                        satisfied = false;
                    }
                }

                if(satisfied) {
                    cont = true;
                    candidates.push({letter: step, info });
                }
            }
        }

        if(candidates.length) {
            candidates = candidates.sort((a, b) => a.letter > b.letter ? 1 : -1);
            result += candidates[0].letter;
            candidates[0].info.marked = true;
        }
    }

    console.log(result);
}).catch((err) => {
    console.log(err.stack);
});