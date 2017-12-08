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
                items[child].parent = node;
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

    let unbalancedNode = undefined;
    let candidateNode = rootNode;

    while(!unbalancedNode) {
        let unbalancedChild = undefined;
        if(candidateNode.children[0].totalWeight === candidateNode.children[1].totalWeight) {
            let targetWeight = candidateNode.children[0].totalWeight;
            for(let child of candidateNode.children) {
                if(child.totalWeight !== targetWeight) {
                    unbalancedChild = child;
                }
            }
        }
        else {
            if(candidateNode.children[0].totalWeight !== candidateNode.children[2].totalWeight) {
                unbalancedChild = candidateNode.children[0];
            }
            else if(candidateNode.children[1].totalWeight !== candidateNode.children[2].totalWeight) {
                unbalancedChild = candidateNode.children[1];
            }
        }

        if(unbalancedChild) {
            candidateNode = unbalancedChild;
        }
        else {
            unbalancedNode = candidateNode;
        }
    }

    let parentNode = unbalancedNode.parent;

    let targetWeight = 0;
    if(parentNode.children[0] === unbalancedNode) {
        targetWeight = parentNode.children[1].totalWeight;
    }
    else {
        targetWeight = parentNode.children[0].totalWeight;
    }

    let weightDelta = unbalancedNode.totalWeight - targetWeight;

    console.log(unbalancedNode.value - weightDelta);
});