let lib = require('../../lib');

let year = 2021;
let day = 16;

function getValue(input, index, length) {
    let str = input.substring(index, index + length);

    return parseInt(str, 2);
}

function parsePacket(input, index) {
    let version = getValue(input, index, 3);
    index += 3;

    let type = getValue(input, index, 3);
    index += 3;

    if(type === 4) {
        while(input[index] === '1') {
            index += 5;
        }
        index += 5;
    }
    else {
        let lengthType = +input[index];
        index++;

        if(lengthType === 0) {
            let subLength = getValue(input, index, 15);
            index += 15;

            let targetIndex = index + subLength;

            while(index < targetIndex) {
                let result = parsePacket(input, index);
                index = result.index;
                version += result.version;
            }
        }
        else {
            let subPackets = getValue(input, index, 11);
            index += 11;
            for(let i = 0; i < subPackets; i++) {
                let result = parsePacket(input, index);
                index = result.index;
                version += result.version;
            }
        }
    }

    return { version, index };
}

lib.getInput(year, day).then((data) => {
    let input = '';
    for(let char of data) {
        let val = parseInt(char, 16).toString(2);
        while(val.length < 4) {
            val = '0' + val;
        }
        input += val;
    }

    console.log(parsePacket(input, 0).version);
}).catch((err) => {
    console.log(err, err.stack);
});