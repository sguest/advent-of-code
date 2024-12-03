const lib = require('../../lib');
let fs = require('fs');
let path = require('path');

let hashes = {};

// Cheating and using a pre-computed list of hashes, since I can't find another way to make this fast
// Only storing the hashes we actually care about (5 leading zeroes) since I don't want to save a file over a gig
function md5(index) {
    return hashes[index] || '';
}

lib.getInput(2016, 5).then((input) => {
    var index = 0;

    let hashLines = fs.readFileSync(path.resolve(__dirname, `zero-hashes-${input}.txt`), 'utf-8').replace(/\r\n/g, '\n').split('\n')
    for(let line of hashLines) {
        let parts = line.split(' ');
        hashes[parts[0]] = parts[1];
    }

    var password = [];
    var foundCount = 0;

    while(foundCount < 8) {
        var hash = md5(index);
        if(hash.startsWith('00000')) {
            var place = parseInt(hash[5], 10);
            if(place <= 7 && !password[place]) {
                password[place] = hash[6];
                foundCount++;
            }
        }
        index++;
    }

    console.log(password.join(''));
});