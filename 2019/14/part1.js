let lib = require('../../lib');

let year = 2019;
let day = 14;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let reactions = {};
    for(let line of lines) {
        let parts = line.split(' => ');
        let inputs = parts[0].split(', ');

        let outputParts = parts[1].split(' ');
        let reaction = {
            amount: +outputParts[0],
            inputs:[],
        }
        for(let input of inputs) {
            let inputParts = input.split(' ');
            let item = {
                amount: +inputParts[0],
                type: inputParts[1],
            }
            reaction.inputs.push(item);
        }

        reactions[outputParts[1]] = reaction;
    }

    let targets = [{ type: 'FUEL', amount: 1}];

    let remaining = {};

    let ore = 0;
    while(targets.length) {
        let current = targets.pop();
        let reaction = reactions[current.type];
        let amountRemaining = remaining[current.type] || 0;
        if(amountRemaining > current.amount) {
            remaining[current.type] = amountRemaining - current.amount;
            continue;
        }
        let amountNeeded = current.amount - amountRemaining;

        let reactionCount = Math.ceil(amountNeeded / reaction.amount);
        let numProduced = reaction.amount * reactionCount;
        remaining[current.type] = numProduced - amountNeeded;

        for(let input of reaction.inputs) {
            if(input.type === 'ORE') {
                ore += input.amount * reactionCount;
            }
            else {
                targets.push({amount: input.amount * reactionCount, type: input.type});
            }
        }
    }

    console.log(ore);
}).catch((err) => {
    console.log(err, err.stack);
});