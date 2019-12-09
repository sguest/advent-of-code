let crypto = require('crypto');
let fs = require('fs');
let path = require('path');
let lib = require('../../lib');

function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

lib.getInput(2016, 14).then((input) => {
    let args = process.argv.slice(2);
    let numHashes = +args[0];
    let iterations = +args[1] || 1;

    let stream = fs.createWriteStream(path.resolve(__dirname, `hashes-${input}-${iterations}.txt`));

    for(let i = 0; i < numHashes; i++) {
        let value = input + i;
        for(let iter = 0; iter < iterations; iter++) {
            value = md5(value);
        }
        stream.write(value + '\n');
    }

    stream.end();
});