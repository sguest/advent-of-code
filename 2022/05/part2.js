let lib = require('../../lib');

let year = 2022;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let loading = true;
    let stacks = [];
    for(let line of lines) {
        if(!line) {
            loading = false;
        }
        else {
            if(loading) {
                if(!/^\s+\d/.test(line)) {
                    for(let i = 0; i * 4 < line.length; i ++) {
                        stacks[i] = stacks[i] || [];
                        if(line[i * 4] === '[') {
                            stacks[i].unshift(line[i * 4 + 1]);
                        }
                    }
                }
            }
            else {
                let parts = line.split(' ');
                let count = +parts[1];
                let index1 = (+parts[3]) - 1;
                let index2 = (+parts[5]) - 1;

                stacks[index2].push(...stacks[index1].splice(-count));
            }
        }
    }

    let result = '';
    for(let stack of stacks) {
        result += stack.pop();
    }

    console.log(result);
}).catch((err) => {
    console.log(err, err.stack);
});