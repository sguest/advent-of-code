let lib = require('../../lib');

let year = 2022;
let day = 11;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let monkeys = [];
    let i = 0;
    while(i < lines.length) {
        i++;
        let line = lines[i].replace(/^\s*Starting items: /, '');
        let items = line.split(', ').map(x => +x);
        i++;
        let parts = lines[i].split(' ');
        let fn;
        let val = parts[parts.length - 1];
        if(parts[parts.length - 2] === '+') {
            if(val === 'old') {
                fn = x => x + x;
            }
            else {
                val = +val;
                fn = x => x + val;
            }
        }
        else {
            if(val === 'old') {
                fn = x => x * x;
            }
            else {
                val = +val;
                fn = x => x * val;
            }
        }
        i++;
        parts = lines[i].split(' ');
        let divisor = +parts[parts.length - 1];
        i++;
        parts = lines[i].split(' ');
        let trueTarget = +parts[parts.length - 1];
        i++;
        parts = lines[i].split(' ');
        let falseTarget = +parts[parts.length - 1];
        i+= 2;
        monkeys.push({
            items,
            fn,
            divisor,
            trueTarget,
            falseTarget,
            inspectCount: 0,
        })
    }

    let commonMultiple = 1;
    for(let monkey of monkeys) {
        commonMultiple *= monkey.divisor;
    }

    for(let round = 0; round < 10000; round++) {
        let m = 0;
        for(let monkey of monkeys) {
            for(let item of monkey.items) {
                monkey.inspectCount++;
                item = monkey.fn(item) % commonMultiple;
                let divisible = (item % monkey.divisor === 0);
                let target = divisible ? monkey.trueTarget : monkey.falseTarget;
                monkeys[target].items.push(item);
            }
            monkey.items = [];
            m++;
        }
    }

    monkeys.sort((a, b) => b.inspectCount - a.inspectCount);

    console.log(monkeys[0].inspectCount * monkeys[1].inspectCount);
}).catch((err) => {
    console.log(err, err.stack);
});