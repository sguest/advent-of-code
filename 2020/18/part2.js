const { P } = require('js-combinatorics');
let lib = require('../../lib');

let year = 2020;
let day = 18;

function calc(line) {
    line = line.replace(/\s/g, '');
    let terms = [];
    let parenDepth = 0;
    let subExpression = '';

    for(let char of line) {
        if(parenDepth > 0) {
            if(parenDepth === 1 && char === ')') {
                parenDepth = 0;
                terms.push(calc(subExpression));
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
            terms.push(isNaN(char) ? char : +char);
        }
    }

    let newTerms = [];
    let current = terms[0];
    for(let i = 2; i < terms.length; i+=2) {
        if(terms[i - 1] === '+') {
            current += terms[i];
        }
        else {
            newTerms.push(current);
            current = terms[i];
        }
    }
    newTerms.push(current);

    return newTerms.reduce((a, b) => a * b);
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