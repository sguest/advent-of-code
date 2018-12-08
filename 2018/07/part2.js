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

    let workers = [];

    for(let i = 0; i < 5; i++) {
        workers.push({step: '', remaining: 0});
    }

    let stepCount = 0;
    for(let step in steps) {
        stepCount++;
    }

    let result = '';
    let completedSteps = 0;
    let time = 0;

    while(completedSteps < stepCount) {
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
                    candidates.push({letter: step, info });
                }
            }
        }

        if(candidates.length) {
            candidates = candidates.sort((a, b) => a.letter > b.letter);
        }

        let finishedJob = false;

        for(let worker of workers) {
            if(worker.remaining <= 0) {
                if(worker.step) {
                    result += worker.step;
                    completedSteps++;
                    worker.step = ''; 
                    finishedJob = true;
                }

                if(candidates.length) {
                    job = candidates.pop();
                    job.info.marked = true;
                    worker.step = job.letter;
                    worker.remaining = job.letter.charCodeAt(0) - 4;
                }
            }
        }

        if(!finishedJob) {
            time++;
            for(let worker of workers) {
                worker.remaining--;
            }
        }
    }

    console.log(time);
}).catch((err) => {
    console.log(err.stack);
});