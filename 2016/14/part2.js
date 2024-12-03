let fs = require('fs');
let path = require('path');
let lib = require('../../lib');
let runner = require('./runner');

lib.getInput(2016, 14).then((input) => {
    let index = 0;
    let hashes = fs.readFileSync(path.resolve(__dirname, `hashes-${input}-2017.txt`), 'utf-8').replace(/\r\n/g, '\n').split('\n');

    console.log(runner(() => {
        let value = hashes[index];
        index++;
        return value;
    }));
});