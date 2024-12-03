let lib = require('../../lib');

let year = 2022;
let day = 21;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let monkeys = { };
    for(let line of lines) {
        let parts = line.split(' ');
        let name = parts[0].substring(0, 4);
        if(parts.length === 2) {
            monkeys[name] = { value: +parts[1] };
        }
        else {
            let refs = [parts[1], parts[3]];
            monkeys[name] = { refs, op: parts[2] };
        }
    }

    const calculate = (name, target) => {
        if(name === 'humn') {
            if(target) {
                console.log(target);
                process.exit(0);
            }
            return false;
        }
        let monkey = monkeys[name];
        if(monkey.value) {
            return monkey.value;
        }
        else {
            let values = monkey.refs.map(r => calculate(r));

            let falseIndex = values.indexOf(false);
            if(falseIndex === -1) {
                switch(monkey.op) {
                    case '+': return values[0] + values[1];
                    case '-': return values[0] - values[1];
                    case '*': return values[0] * values[1];
                    case '/': return values[0] / values[1];
                }
            }

            if(name === 'root') {
                calculate(monkey.refs[falseIndex], values[1 - falseIndex]);
            }
            else if(target) {
                switch(monkey.op) {
                    case '+': calculate(monkey.refs[falseIndex], target - values[1 - falseIndex]);
                    case '*': calculate(monkey.refs[falseIndex], target / values[1 - falseIndex]);
                    case '-':
                        if(falseIndex === 0) {
                            calculate(monkey.refs[0], target + values[1]);
                        }
                        else {
                            calculate(monkey.refs[1], values[0] - target);
                        }
                    case '/':
                        if(falseIndex === 0) {
                            calculate(monkey.refs[0], target * values[1]);
                        }
                        else {
                            calculate(monkey.refs[0], values[0] / target);
                        }
                }
            }
            return false;
        }
    }

    calculate('root');
}).catch((err) => {
    console.log(err, err.stack);
});