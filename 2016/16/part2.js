let lib = require('../../lib');

let year = 2016;
let day = 16;

lib.getInput(year, day).then((data) => {
    while(data.length < 35651584) {
        let copy = data;
        copy = copy.split('').reverse().map((x) => x === '1' ? '0' : '1').join('');
        data = data + '0' + copy;
    }
    data = data.substring(0, 35651584);

    let checksum = data;

    while(checksum.length % 2 === 0) {
        let newChecksum = [];
        for(let index = 0; index < checksum.length; index += 2) {
            if(checksum[index] === checksum[index + 1]) {
                newChecksum.push('1');
            }
            else {
                newChecksum.push('0');
            }
        }
        checksum = newChecksum.join('');
    }

    console.log(checksum);
});