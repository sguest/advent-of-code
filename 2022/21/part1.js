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

    const calculate = monkey => {
        if(monkey.value) {
            return monkey.value;
        }
        else {
            let values = monkey.refs.map(r => calculate(monkeys[r]));

            switch(monkey.op) {
                case '+': return values[0] + values[1];
                case '-': return values[0] - values[1];
                case '*': return values[0] * values[1];
                case '/': return values[0] / values[1];
            }
        }
    }

    console.log(calculate(monkeys.root));
}).catch((err) => {
    console.log(err, err.stack);
});