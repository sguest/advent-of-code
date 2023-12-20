let lib = require('../../lib');

let year = 2023;
let day = 20;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let linesParsed = {};
    for(let line of lines) {
        let [label, outputString] = line.split(' -> ');
        let outputs = outputString.split(', ');
        let type = 'broadcaster';
        if(label !== 'broadcaster') {
            type = label[0];
            label = label.substring(1);
        }
        linesParsed[label] = { type, outputs };
    }

    let start;
    let nodes = {};
    for(let label in linesParsed) {
        let parsed = linesParsed[label];
        nodes[label] = nodes[label] || { inputs: [], outputs: [], state: false };
        nodes[label].type = parsed.type;
        for(let output of parsed.outputs) {
            nodes[output] = nodes[output] || { inputs: [], outputs: [], state: false };
            nodes[label].outputs.push(nodes[output]);
            nodes[output].inputs.push({ high: false, node: nodes[label] })
        }

        if(label === 'broadcaster') {
            start = nodes[label];
        }
    }

    let lowCount = 0;
    let highCount = 0;

    for(let count = 0; count < 1000; count++) {
        let queue = new lib.linkedList();
        queue.push({ target: start, high: false });
        while(queue.length) {
            let signal = queue.shift();
            if(signal.high) {
                highCount++;
            }
            else {
                lowCount++;
            }

            let currentNode = signal.target;
            switch(currentNode.type) {
                case 'broadcaster':
                    for(let output of currentNode.outputs) {
                        queue.push({ target: output, high: signal.high, from: currentNode });
                    }
                    break;
                case '%':
                    if(!signal.high) {
                        currentNode.state = !currentNode.state;
                        for(let output of currentNode.outputs) {
                            queue.push({ target: output, high: currentNode.state, from: currentNode });
                        }
                    }
                    break;
                case '&':
                    let input = currentNode.inputs.find(i => i.node === signal.from);
                    input.high = signal.high;
                    let allHigh = currentNode.inputs.every(i => i.high);
                    for(let output of currentNode.outputs) {
                        queue.push({ target: output, high: !allHigh, from: currentNode });
                    }
                    break;
            }
        }
    }

    console.log(lowCount * highCount);
}).catch((err) => {
    console.log(err, err.stack);
});