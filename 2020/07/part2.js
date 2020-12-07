let lib = require('../../lib');

let year = 2020;
let day = 7;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let rules = {};
    for(let line of lines) {
        let parent = /(.*) bags contain /.exec(line)[1];
        let rest = line.replace(/.* bags contain /, '');
        let parts = rest.split(',');
        let children = [];
        for(let part of parts) {
            if(!/no other bags/.test(part)) {
                let result = /\s*(\d+)\s*(.*) bag/.exec(part);
                children.push({ colour: result[2], count: +result[1]});
            }
        }
        rules[parent] = children;
    }

    let count = 0;

    let nodes = [];
    for(let child of rules['shiny gold']) {
        nodes.push({mult: 1, rule: child});
    }

    for(let index = 0; index < nodes.length; index++) {
        let current = nodes[index];
        count += current.mult * current.rule.count;
        for(let rule of rules[current.rule.colour]) {
            nodes.push({mult: current.rule.count * current.mult, rule})
        }
    }

    console.log(count);

}).catch((err) => {
    console.log(err, err.stack);
});