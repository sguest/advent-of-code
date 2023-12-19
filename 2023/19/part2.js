let lib = require('../../lib');

let year = 2023;
let day = 19;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let workflows = {};
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
                    workflowSteps.push({ target: condition});
                }
                else {
                    let compareFn;
                    if(condition.indexOf('<') > -1) {
                        let [field, value] = condition.split('<');
                        value = +value;
                        compareFn = { op: '<' , field, value };
                    }
                    else if(condition.indexOf('>') > -1) {
                        let [field, value] = condition.split('>');
                        value = +value;
                        compareFn = { op: '>' , field, value };
                    }
                    workflowSteps.push({ condition: compareFn, target });
                }
            }
            workflows[label] = workflowSteps;
        }
    }

    let ranges = [{
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 },
        target: 'in',
    }];

    let count = 0;
    while(ranges.length) {
        let current = ranges.pop();

        if(current.target === 'A') {
            count += (current.x.max - current.x.min + 1) * (current.m.max - current.m.min + 1) * (current.a.max - current.a.min + 1) * (current.s.max - current.s.min + 1);
        }
        else if(current.target !== 'R') {
            let workflow = workflows[current.target];
            for(let step of workflow) {
                if(step.condition) {
                    let condition = step.condition;
                    let cloned = {
                        x: {...current.x},
                        m: {...current.m},
                        a: {...current.a},
                        s: {...current.s},
                        target: step.target,
                    }
                    let isNew = false;
                    if(step.condition.op === '<') {
                        if(current[condition.field].min < condition.value - 1) {
                            isNew = true;
                            cloned[condition.field].max = condition.value - 1;
                            current[condition.field].min = condition.value;
                        }
                    }
                    else {
                        if(current[condition.field].max > condition.value + 1) {
                            isNew = true;
                            cloned[condition.field].min = condition.value + 1;
                            current[condition.field].max = condition.value;
                        }
                    }
                    if(isNew) {
                        ranges.push(cloned);
                    }
                }
                else {
                    current.target = step.target;
                    ranges.push(current);
                }
            }
        }
    }
    console.log(count); 
}).catch((err) => {
    console.log(err, err.stack);
});