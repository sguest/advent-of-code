let lib = require('../../lib');

let year = 2023;
let day = 19;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let workflows = {};
    let parts = [];
    let phase = 0;
    for(let line of lines) {
        if(!line) {
            phase = 1
        }
        else if(phase === 0) {
            line = line.replace('}', '');
            let [label, stepString] = line.split('{');
            let steps = stepString.split(',');
            let workflowSteps = [];
            for(let step of steps) {
                let [condition, target] = step.split(':');
                if(!target) {
                    workflowSteps.push({ condition: () => true, target: condition});
                }
                else {
                    let compareFn;
                    if(condition.indexOf('<') > -1) {
                        let [field, value] = condition.split('<');
                        value = +value;
                        compareFn = part => part[field] < value;
                    }
                    else if(condition.indexOf('>') > -1) {
                        let [field, value] = condition.split('>');
                        value = +value;
                        compareFn = part => part[field] > value;
                    }
                    workflowSteps.push({ condition: compareFn, target });
                }
            }
            workflows[label] = workflowSteps;
        }
        else {
            line = line.replace('{', '').replace('}', '');
            let values = line.split(',');
            let part = {};
            for(let value of values) {
                let[label, num] = value.split('=');
                part[label] = +num;
            }
            parts.push(part);
        }
    }

    let sum = 0;
    for(let part of parts) {
        let target = 'in';
        while(target !== 'A' && target !== 'R') {
            let workflow = workflows[target];
            target = undefined;
            let index = 0;
            while(!target) {
                let step = workflow[index];
                let result = step.condition(part);
                if(result) {
                    target = step.target;
                }
                else {
                    index++;
                }
            }
        }

        if(target === 'A') {
            sum += part.x + part.m + part.a + part.s;
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});