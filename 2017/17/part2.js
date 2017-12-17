let input = 376;
let next = 1;
let index = 0;
let zeroPos = 0;
let afterZero = 0;

while(next <= 50000000) {
    index = (index + input % next) % next;
    if(index === zeroPos) {
        afterZero = next;
    }
    next++;
    index = (index + 1) % next;
}

console.log(afterZero);