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
    let end;
    let nodes = {};
    for(let label in linesParsed) {
        let parsed = linesParsed[label];
        nodes[label] = nodes[label] || { inputs: [], outputs: [], state: false, label };
        nodes[label].type = parsed.type;
        for(let output of parsed.outputs) {
            nodes[output] = nodes[output] || { inputs: [], outputs: [], state: false, label: output };
            nodes[label].outputs.push(nodes[output]);
            nodes[output].inputs.push({ high: false, node: nodes[label] })
        }

        if(label === 'broadcaster') {
            start = nodes[label];
        }

        if(parsed.outputs.some(o => o === 'rx')) {
            end = nodes[label];
        }
    }

    // This is a reverse-engineering question, truly generalized solutions are impossible in reasonable time
    // the assumption for today is rx is fed by a single conjunction node, which is fed by several other conjunctions
    let feeders = end.inputs.length;
    let cycleCounts = {};
    let cyclesFound = 0;

    let presses = 0;
    while(true) {
        presses++;
        let queue = new lib.linkedList();
        queue.push({ target: start, high: false });
        while(queue.length) {
            let signal = queue.shift();

            let currentNode = signal.target;

            if(currentNode === end && signal.high) {
                if(!cycleCounts[signal.from.label]) {
                    cycleCounts[signal.from.label] = presses;
                    cyclesFound++;
                }

                if(cyclesFound === feeders) {
                    let countValues = [];
                    for(let key in cycleCounts) {
                        countValues.push(cycleCounts[key]);
                    }
                    console.log(lib.lcm(...countValues))
                    process.exit(0);
                }
            }

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
}).catch((err) => {
    console.log(err, err.stack);
});