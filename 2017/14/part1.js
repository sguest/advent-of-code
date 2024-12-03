let knotHash = require('../../lib').knotHash;
let lib = require('../../lib');

lib.getInput(2017, 14).then((input) => {
    let count = 0;

    for(let index = 0; index < 128; index++) {
        let hash = knotHash(input + '-' + index);
        for(let char of hash.split('')) {
            let bits = parseInt(char, 16).toString(2);
            for(let bit of bits.split('')) {
                if(bit === '1') {
                    count++;
                }
            }
        }
    }

    console.log(count);
});