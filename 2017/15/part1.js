aStart = 277;
bStart = 349;

aFactor = 16807;
bFactor = 48271;

let count = 0;

let aCurrent = aStart;
let bCurrent = bStart;

for(let index = 0; index < 40000000; index++) {
    aCurrent = (aCurrent * aFactor) % 2147483647;
    bCurrent = (bCurrent * bFactor) % 2147483647;

    if(aCurrent % 0x10000 === bCurrent % 0x10000) {
        count++;
    }
}

console.log(count);