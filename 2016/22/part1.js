let lib = require('../../lib');

let year = 2016;
let day = 22;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    lines.shift();
    lines.shift();

    let nodes = [];
    for(let line of lines) {
        let parts = line.split(/\s+/);
        let parsedName = /^\/dev\/grid\/node-x(\d+)-y(\d+)$/.exec(parts[0]);
        let x = parseInt(parsedName[1], 10);
        let y = parseInt(parsedName[2], 10);
        nodes[x] = nodes[x] || [];
        nodes[x][y] = {
            x,
            y,
            used: parseInt(parts[2], 10),
            avail: parseInt(parts[3], 10)
        };
    }

    let count = 0;
    let foundPairs = {};

    for(let line of nodes) {
        for(let node of line) {
            for(let line2 of nodes) {
                for(let node2 of line2) {
                    if(node !== node2 && !foundPairs[[node.x, node.y, node2.x, node2.y].join(',')] && ((node.used > 0 && node.used <= node2.avail) || (node2.used > 0 && node2.used <= node.avail))) {
                        count++;
                        foundPairs[[node2.x, node2.y, node.x, node.y].join(',')] = true;
                    }
                }
            }
        }
    }

    console.log(count);
});