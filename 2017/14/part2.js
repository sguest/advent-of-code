let knotHash = require('../../lib').knotHash;
let lib = require('../../lib');

lib.getInput(2017, 14).then((input) => {
    let field = [];
    let visited = [];

    for(let index = 0; index < 128; index++) {
        field.push([]);
        visited.push([]);
        let hash = knotHash(input + '-' + index);
        for(let char of hash.split('')) {
            let bits = parseInt(char, 16).toString(2);
            while(bits.length < 4) {
                bits = '0' + bits;
            }
            for(let bit of bits.split('')) {
                field[index].push(bit === '1');
            }
        }
    }

    let count = 0;

    for(let x = 0; x < 128; x++) {
        for(let y = 0; y < 128; y++) {
            if(field[x][y] && !visited[x][y]) {
                count++;
                let queue = [{x, y}];
                while(queue.length) {
                    let current = queue.shift();
                    if(visited[current.x] && !visited[current.x][current.y]) {
                        visited[current.x][current.y] = true;
                        if(field[current.x][current.y]) {
                            queue.push({x: current.x - 1, y: current.y});
                            queue.push({x: current.x + 1, y: current.y});
                            queue.push({x: current.x, y: current.y - 1});
                            queue.push({x: current.x, y: current.y + 1});
                        }
                    }
                }
            }
        }
    }

    console.log(count);
});