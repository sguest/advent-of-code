import { getInput } from '../../lib/index.ts';
import { init } from 'z3-solver';
import type { Arith } from 'z3-solver';

const { Context } = await init();
const { Optimize, Int } = Context('main');

let year = 2025;
let day = 10;


let data = await getInput(year, day);

let lines = data.split('\n');
let count = 0;
for(let line of lines) {
    let parts = line.split(' ');
    parts.shift();
    let joltages = parts.pop()!.replace('{', '').replace('}', '').split(',').map(x => +x);
    let buttons = parts.map(p => p.replace('(', '').replace(')', '').split(',').map(x => +x));

    let optimize = new Optimize();
    let variables: Arith<"main">[] = [];

    // Create variables for number of times each button is pressed
    for(let i = 0; i < buttons.length; i++) {
        let value = Int.const(i.toString());
        optimize.add(value.ge(0));
        variables.push(value);
    }

    // For each joltage
    for(let i = 0; i < joltages.length; i++) {
        // Start with 0, will be 0 + ...
        let condition: Arith<"main"> = Int.val(0);
        for(let j = 0; j < buttons.length; j++) {
            if(buttons[j].includes(i)) {
                // if this button affects this joltage, equation gains + <variable>
                condition = condition.add(variables[j])
            }
        }
        // joltage = button1 + button2 + ...
        let eq = condition.eq(Int.val(joltages[i]));
        optimize.add(eq);
    }

    // sum = variable1 + variable2 + ... for each button's variable
    let sum = variables.reduce((a, b) => a.add(b), Int.val(0));
    // minimize sum given constraints
    optimize.minimize(sum);
    let check = await optimize.check();
    if(check === 'sat') {
        count += parseInt(optimize.model().eval(sum).toString());
    }
}
console.log(count);