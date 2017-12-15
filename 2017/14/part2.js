let input = 'uugsqrei';

function knotHash(input) {
    let lengths = input.split('').map((x) => x.charCodeAt(0));
    lengths.push(17, 31, 73, 47, 23);
    let nums = [];
    let currentPos = 0;
    let skipSize = 0;

    for(let index = 0; index < 256; index++) {
        nums.push(index);
    }

    for(let round = 0; round < 64; round++) {
        for(let length of lengths) {
            let reverseArr = [];

            if(length + currentPos > nums.length) {
                reverseArr = nums.slice(currentPos);
                reverseArr.push(...nums.slice(0, length - (nums.length - currentPos)));
            }
            else {
                reverseArr = nums.slice(currentPos, currentPos + length);
            }

            reverseArr = reverseArr.reverse();

            if(length + currentPos > nums.length) {
                nums.splice(currentPos, nums.length - currentPos, ...(reverseArr.slice(0, nums.length - currentPos)));
                nums.splice(0, length - (nums.length - currentPos), ...(reverseArr.slice(nums.length - currentPos)));
            }
            else {
                nums.splice(currentPos, length, ...reverseArr);
            }

            currentPos = (currentPos + length + skipSize) % nums.length;
            skipSize++;
        }
    }
    let denseHash = [];
    
    for(let block = 0; block < 16; block++) {
        denseHash.push(nums.slice(block * 16, block * 16 + 16).reduce((a, b) => { return a ^ b; }));
    }

    return denseHash.map((x) => {
        let val = x.toString(16);
        if(val.length === 1) {
            val = '0' + val;
        }
        return val;
    }).join('');
}

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