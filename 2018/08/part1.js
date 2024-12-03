let lib = require('../../lib');

let year = 2018;
let day = 8;

lib.getInput(year, day).then((data) => {
    let items = data.split(' ').map(x => +x);

    let nodes = [{entries: items.shift(), meta: items.shift()}];
    let total = 0;

    while(items.length) {
        let current = nodes[nodes.length - 1];
        if(current.entries > 0) {
            current.entries--;
            nodes.push({entries: items.shift(), meta: items.shift()});
        }
        else if(current.meta > 0) {
            total += items.shift();
            current.meta--;
        }
        else {
            nodes.pop();
        }
    } 

    console.log(total);
}).catch((err) => {
    console.log(err.stack);
});