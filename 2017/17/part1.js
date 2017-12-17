let input = 376;
let buffer = [0];
let next = 1;
let index = 0;

while(next <= 2017) {
    index = (index + input % buffer.length) % buffer.length;
    buffer.splice(index + 1, 0, next);
    next++;
    index = (index + 1) % buffer.length;
}

console.log(buffer[buffer.indexOf(2017) + 1]);