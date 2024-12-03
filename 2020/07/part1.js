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
                let result = /\s*\d+\s*(.*) bag/.exec(part);
                if(!result[1]) {
                    console.log(part);
                }
                children.push(result[1]);
            }
        }
        rules[parent] = children;
    }

    let validChildren = ['shiny gold'];

    let outers = [];
    for(let index = 0; index < validChildren.length; index++) {
        let child = validChildren[index];
        for(let parent in rules) {
            if(rules[parent].indexOf(child) !== -1 && outers.indexOf(parent) === -1) {
                outers.push(parent);
                validChildren.push(parent);
            }
        }
    }

    console.log(outers.length);

}).catch((err) => {
    console.log(err, err.stack);
});