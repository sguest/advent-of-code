let lib = require('../../lib');

let year = 2023;
let day = 25;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let graph = {};
    for(let line of lines) {
        let [node, targets] = line.split(': ');
        targets = targets.split(' ');
        graph[node] = [...(graph[node] || []), ...targets];
        for(let target of targets) {
            graph[target] ||= [];
            graph[target].push[node];
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});