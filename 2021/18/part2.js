let lib = require('../../lib');

let year = 2021;
let day = 18;

function clone(number) {
    if(typeof number === 'number') {
        return number;
    }
    let result = { left: clone(number.left), right: clone(number.right) };
    result.left.parent = result;
    result.right.parent = result;
    return result;
}

function toString(number) {
    if(typeof number === 'number') {
        return number;
    }
    return `[${toString(number.left)},${toString(number.right)}]`
}

function tryExplode(number, depth) {
    if(depth >= 4 && typeof number.left === 'number' && typeof number.right === 'number') {
        let prev = number;
        let current = number.parent;
        while(current && current.left === prev) {
            prev = current;
            current = current.parent;
        }
        if(current) {
            let done = false;
            if(typeof current.left === 'number') {
                current.left += number.left;
                done = true;
            }
            else {
                current = current.left;
            }
            while(!done) {
                if(typeof current.right === 'number') {
                    current.right += number.left;
                    done = true;
                }
                else {
                    current = current.right;
                }
            }
        }

        prev = number;
        current = number.parent;
        while(current && current.right === prev) {
            prev = current;
            current = current.parent;
        }
        if(current) {
            let done = false;
            if(typeof current.right === 'number') {
                current.right += number.right;
                done = true;
            }
            else {
                current = current.right;
            }
            while(!done) {
                if(typeof current.left === 'number') {
                    current.left += number.right;
                    done = true;
                }
                else {
                    current = current.left;
                }
            }
        }

        if(number === number.parent.left) {
            number.parent.left = 0;
        }
        else {
            number.parent.right = 0;
        }

        return true;
    }
    else {
        let exploded = false;
        if(typeof number.left !== 'number') {
            exploded = tryExplode(number.left, depth + 1);
        }
        if(!exploded && typeof number.right !== 'number') {
            exploded = tryExplode(number.right, depth + 1);
        }
        return exploded;
    }
}

function trySplit(number) {
    let split = false;
    if(typeof number.left === 'number' && number.left >= 10) {
        number.left = {parent: number, left: Math.floor(number.left / 2), right: Math.ceil(number.left / 2)};
        return true;
    }
    else if(typeof number.left !== 'number') {
        split = trySplit(number.left);
    }
    if(!split) {
        if(typeof number.right === 'number' && number.right >= 10) {
            number.right = {parent: number, left: Math.floor(number.right / 2), right: Math.ceil(number.right / 2)};
            return true;
        }
        else if(typeof number.right !== 'number') {
            split = trySplit(number.right);
        }
    }
    return split;
}

function reduce(number) {
    let exploded = true;
    let split = true;

    while(exploded || split)
    {
        exploded = false;
        split = false;

        exploded = tryExplode(number, 0);
        if(!exploded) {
            split = trySplit(number);
        }
    }

    return number;
}

function getMagnitude(number) {
    if(typeof number === 'number') {
        return number;
    }
    let leftVal = getMagnitude(number.left);
    let rightVal = getMagnitude(number.right);
    return leftVal * 3 + rightVal * 2;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let numbers = [];

    for(let line of lines) {
        let current = {};
        let val = null;

        for(let char of line) {
            if(char === '[') {
                let next = { parent: current };
                if(current.left !== undefined) {
                    current.right = next;
                }
                else {
                    current.left = next;
                }
                current = next;
            }
            else if(char === ']') {
                if(val !== null)  {
                    current.right = +val;
                    val = null;
                }
                current = current.parent;
            }
            else if(char === ',') {
                if(val !== null) {
                    current.left = +val;
                    val = null;
                }
            }
            else {
                if(val === null) {
                    val = '';
                }
                val += char;
            }
        }

        let number = current.left;
        number.parent = undefined;
        numbers.push(number);
    }

    let max = 0;
    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            if(i !== j) {
                let left = clone(numbers[i]);
                let right = clone(numbers[j]);
                let added = {left, right};
                left.parent = added;
                right.parent = added;
                reduce(added);
                let magnitude = getMagnitude(added);
                max = Math.max(max, magnitude);
            }
        }
    }
    console.log(max);
}).catch((err) => {
    console.log(err, err.stack);
});