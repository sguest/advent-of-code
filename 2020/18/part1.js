let lib = require('../../lib');

let year = 2020;
let day = 18;

function calc(line) {
    line = line.replace(/\s/g, '');
    let parenDepth = 0;
    let subExpression = '';
    let current = undefined;
    let currentExpression = undefined;

    for(let char of line) {
        let operand = undefined;
        if(parenDepth > 0) {
            if(parenDepth === 1 && char === ')') {
                parenDepth = 0;
                operand = calc(subExpression);
                if(current === undefined) {
                    current = operand;
                }
                subExpression = '';
            }
            else {
                subExpression += char;
                if(char === '(') {
                    parenDepth++;
                }
                else if(char === ')') {
                    parenDepth--;
                }
            }
        }
        else if(char === '(') {
            parenDepth = 1;
        }
        else {
            if(current === undefined) {
                current = +char;
            }
            else {
                if(currentExpression === undefined) {
                    currentExpression = char;
                }
                else {
                    operand = +char;
                }
            }
        }

        if(currentExpression && operand) {
            if(currentExpression === '+') {
                current += operand;
            }
            else {
                current *= operand;
            }
            currentExpression = undefined;
        }
    }

    return current;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let sum = 0;
    for(let line of lines) {
        sum += calc(line);
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});