let lib = require('../../lib');

let year = 2022;
let day = 7;

function calcTotalSize(dir) {
    let size = 0;

    for(let fileName in dir.files) {
        size += dir.files[fileName];
    }
    for(let dirName in dir.children) {
        size += calcTotalSize(dir.children[dirName]);
    }
    dir.size = size;
    return size;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let root = { children: {}, files: {}};
    let current = root;
    for(let line of lines) {
        let parts = line.split(' ');
        if(parts[0] === '$') {
            if(parts[1] === 'cd') {
                if(parts[2] === '/') {
                    current = root;
                }
                else if(parts[2] === '..') {
                    current = current.parent;
                }
                else {
                    current = current.children[parts[2]];
                }
            }
        }
        else if(parts[0] === 'dir') {
            if(!current.children[parts[1]]) {
                current.children[parts[1]] = {
                    parent: current,
                    children: {},
                    files: {}
                };
            }
        }
        else {
            current.files[parts[1]] = +parts[0];
        }
    }

    calcTotalSize(root);

    const max = 100000;
    let queue = [root];
    let total = 0;

    while(queue.length) {
        current = queue.pop();
        if(current.size <= max) {
            total += current.size;
        }

        for(let dirName in current.children) {
            queue.push(current.children[dirName]);
        }
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});