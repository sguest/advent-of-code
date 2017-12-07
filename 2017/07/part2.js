let lib = require('../../lib');

let year = 2017;
let day = 7;

lib.getInput(year, day).then((data) => {
    let firstParser = /^([a-z]+) \((\d+)\)/;
    let items = {};
    let isChild = {};

    for(let line of data.split('\n')) {
        let parsed = firstParser.exec(line);
        let name = parsed[1];
        let value = parseInt(parsed[2], 10);

        let item = { name: name, value: value }

        let children = [];
        if(line.indexOf('>') !== -1) {
            let childItems = line.split('>');
            childItems = childItems[1].split(',').map((x) => x.trim());
            item.children = childItems;

            for(let childItem of childItems) {
                isChild[childItem] = true;
            }
        }

        items[item.name] = item;
    }

    let rootNode;

    for(let itemName in items) {
        let item = items[itemName];
        if(!isChild[itemName]) {
            rootNode = item;
            break;
        }
    }

    function populateChildren(node) {
        let newChildren = [];

        if(node.children) {
            for(child of node.children) {
                newChildren.push(items[child]);
                populateChildren(items[child]);
            }
        }

        node.children = newChildren;
    }

    populateChildren(rootNode);

    function populateTotalWeight(node){
        let total = 0;
        if(node.children) {
            for(child of node.children) {
                total += populateTotalWeight(child);
            }
        }
        total += node.value;
        node.totalWeight = total;
        return total;
    }

    populateTotalWeight(rootNode);

    //manually look through tree via debugger and find the unbalanced one. Will come up with an actual code solution later.
    console.log(rootNode);
});