let lib = require('../../lib');

let year = 2017;
let day = 24;

lib.getInput(year, day).then((data) => {
    let components = [];
    for(let line of data.split('\n')) {
        let parts = line.split('/');
        components.push({x: parseInt(parts[0], 10), y: parseInt(parts[1], 10)});
    }      

    let state = {components, strength: 0, end: 0};

    let queue = new lib.linkedList();
    queue.push(state);

    let strongest = 0;

    while(queue.any()) {
        let current = queue.shift();

        for(let index = 0; index < current.components.length; index++) {
            let component = current.components[index];
            let newEnd = undefined;
            if(component.x === current.end) {
                newEnd = component.y;
            }
            else if(component.y === current.end) {
                newEnd = component.x;
            }

            if(newEnd !== undefined) {
                let newComponents = current.components.slice();
                newComponents.splice(index, 1);
                queue.push({components: newComponents, strength: current.strength + component.x + component.y, end: newEnd});
                strongest = Math.max(strongest, current.strength + component.x + component.y);
            }
        }
    }

    console.log(strongest);
}).catch((err) => {
    console.log(err.stack);
});