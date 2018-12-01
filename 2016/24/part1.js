let lib = require('../../lib');
let Combinatorics = require('js-combinatorics');

let year = 2016;
let day = 24;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let result;
    let grid = [];
    let nodes = [];

    for(let x of lines[0]) {
        grid.push([]);
    }

    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        for(let x = 0; x < line.length; x++) {
            grid[x][y] = (line[x] !== '#');

            let num = parseInt(line[x], 10);

            if(!isNaN(num)) {
                nodes.push({id: num, x, y,});
            }
        }
    }

    let distances = {};

    nodeloop: for(let node of nodes) {
        let queue = [];
        let visited = [];

        queue.push({distance: 0, target: {x: node.x - 1, y: node.y}});
        queue.push({distance: 0, target: {x: node.x + 1, y: node.y}});
        queue.push({distance: 0, target: {x: node.x, y: node.y - 1}});
        queue.push({distance: 0, target: {x: node.x, y: node.y + 1}});

        mainloop: while(queue.length) {
            let state = queue.shift();
            let target = state.target;

            if(target.x < 0 || target.y < 0 || target.x > lines[0].length || target.y > lines.length) {
                continue;
            }

            if(!grid[target.x][target.y]) {
                continue;
            }

            for(let visit of visited) {
                if(visit.x === target.x && visit.y === target.y) {
                    continue mainloop;
                }
            }

            visited.push(target);
            let nodeCount = state.nodeCount;

            for(let targetNode of nodes) {
                if(targetNode !== node && targetNode.x === target.x && targetNode.y === target.y) {
                    nodeCount++;

                    let key = `${node.id},${targetNode.id}`;

                    distances[key] = Math.min(distances[key] || Infinity, state.distance + 1);
                }
            }

            queue.push({distance: state.distance + 1, nodeCount, target: {x: target.x - 1, y: target.y}});
            queue.push({distance: state.distance + 1, nodeCount, target: {x: target.x + 1, y: target.y}});
            queue.push({distance: state.distance + 1, nodeCount, target: {x: target.x, y: target.y - 1}});
            queue.push({distance: state.distance + 1, nodeCount, target: {x: target.x, y: target.y + 1}});
        }
    }

    let nodeList = [];

    for(let index = 1; index < nodes.length; index++) {
        nodeList.push(index);
    }

    let permutations = Combinatorics.permutation(nodeList);
    let minDistance = Infinity;

    while(permutation = permutations.next()) {
        let current = 0;
        let distance = 0;

        for(let node of permutation) {
            distance += distances[`${current},${node}`];
            current = node;
        }

        minDistance = Math.min(distance, minDistance);
    }

    console.log(minDistance);
}).catch((err) => {
    console.log(err.stack);
});