let lib = require('../../lib');
let modPow = require('bigint-crypto-utils').modPow;
let modInv = require('bigint-crypto-utils').modInv;

let year = 2019;
let day = 22;

function mod(number, modulus) {
    return ((number % modulus) + modulus) % modulus;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let deckSize = 119315717514047n;
    let iterations = 101741582076661n;

    let offset = 0n;
    let increment = 1n;

    for(let line of lines) {
        if(line === 'deal into new stack') {
            increment = mod(increment * -1n, deckSize);
            offset = mod(offset + increment, deckSize);
        }
        else if(/^cut/.test(line)) {
            let cutAmount = BigInt(line.split(' ')[1]);

            offset = mod(offset + increment * cutAmount, deckSize);
        }
        else if(/^deal with increment/.test(line)) {
            let incrementAmount = BigInt(line.split(' ')[3]);

            increment = mod(increment * modInv(incrementAmount, deckSize), deckSize);
        }
        else {
            throw `Unrecognized line ${line}`;
        }
    }

    let finalIncrement = modPow(increment, iterations, deckSize);
    let finalOffset = mod(offset * (1n - modPow(increment, iterations, deckSize)) * modInv(1n - increment, deckSize), deckSize);

    console.log(mod(finalOffset + finalIncrement * 2020n, deckSize).toString().replace(/n$/, ''));
}).catch((err) => {
    console.log(err, err.stack);
});

//241017749378392145 too high
//96797432275571
//17205 too low