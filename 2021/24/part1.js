let lib = require('../../lib');

let year = 2021;
let day = 24;

lib.getInput(year, day).then((data) => {
    // Today's problem is meant to be solved by hand rather than by code
    // See input_solved.txt for the real solution
    // In order to have some kind of code solution, this is going to start with the known answer and
    // run the VM to verify it
    let answer = '92915979999498';
    let inputs = answer.split('').map(x => +x);

    let variables = { w: 0, x: 0, y: 0, z: 0 };
    let lines = data.split('\n');
    for(let line of lines) {
        let parts = line.split(' ');
        let op = parts[0];
        let target = parts[1];
        let leftValue = variables[target];
        let rightValue = +parts[2];
        if(isNaN(rightValue)) {
            rightValue = variables[parts[2]];
        }

        switch(op) {
            case 'inp':
                variables[target] = inputs.shift();
                break;
            case 'add':
                variables[target] = leftValue + rightValue;
                break;
            case 'mul':
                variables[target] = leftValue * rightValue;
                break;
            case 'div':
                variables[target] = Math.trunc(leftValue / rightValue);
                break;
            case 'mod':
                variables[target] = leftValue % rightValue;
                break;
            case 'eql':
                variables[target] = leftValue == rightValue ? 1 : 0;
                break;
        }
    }

    if(variables.z === 0) {
        console.log(answer);
    }
    else {
        console.log(`Error, value of z was ${variables.z}, expected 0`);
    }
}).catch((err) => {
    console.log(err, err.stack);
});