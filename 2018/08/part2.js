let lib = require('../../lib');

let year = 2018;
let day = 8;

function calcValue(node) {
    if(node.children.length) {
        for(let metaItem of node.meta) {
            if(metaItem > 0 && node.children.length >= metaItem) {
                node.value += node.children[metaItem - 1].value;
            }
        }
    }
    else {
        node.value = node.meta.reduce((a, b) => a + b);
    }
}

lib.getInput(year, day).then((data) => {
    let items = data.split(' ').map(x => +x);

    let root = { value: 0, entries: items.shift(), metaCount: items.shift(), meta: [], children: []};
    let current = root;

    while(items.length) {
        if(current.entries > 0) {
            current.entries--;
            let newNode = { value: 0, entries: items.shift(), metaCount: items.shift(), meta: [], children: [], parent: current };
            current.children.push(newNode);
            current = newNode;
        }
        else if(current.metaCount > 0) {
            current.metaCount--;
            current.meta.push(items.shift());
        }
        else {
            calcValue(current);
            current = current.parent;
        }
    }
    
    calcValue(root);

    console.log(root.value);
}).catch((err) => {
    console.log(err.stack);
});