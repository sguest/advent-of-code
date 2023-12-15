let lib = require('../../lib');

let year = 2023;
let day = 15;

lib.getInput(year, day).then((data) => {
    let steps = data.split(',');

    let boxes = [];
    for(let step of steps) {
        let label;
        let focal;
        let action;
        if(step.indexOf('=') > -1) {
            [label, focal] = step.split('=');
            focal = +focal;
            action = '=';
        }
        else {
            label = step.replace('-', '');
            action = '-';
        }
        let hashValue = 0;
        for(let char of label) {
            hashValue += char.charCodeAt(0);
            hashValue *= 17;
            hashValue %= 256;
        }

        boxes[hashValue] = boxes[hashValue] || [];
        let box = boxes[hashValue];
        let idx = box.findIndex(l => l.label === label);
        if(action === '-') {
            if(idx > -1) {
                box.splice(idx, 1);
            }
        }
        else {
            if(idx > -1) {
                box[idx] = { label, focal };
            }
            else {
                box.push({ label, focal });
            }
        }
    }

    let sum = 0;
    for(let boxNum = 0; boxNum < boxes.length; boxNum++) {
        if(boxes[boxNum]) {
            let box = boxes[boxNum];
            for(let lensNum = 0; lensNum < box.length; lensNum++) {
                let lens = box[lensNum];
                sum += ((boxNum + 1)  * (lensNum + 1) * lens.focal);
            }
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});