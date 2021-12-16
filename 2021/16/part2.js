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

    let value;

    if(type === 4) {
        let str = '';
        while(input[index] === '1') {
            str += input.substring(index + 1, index + 5);
            index += 5;
        }
        str += input.substring(index + 1, index + 5);
        index += 5;
        value = parseInt(str, 2);
    }
    else {
        let lengthType = +input[index];
        index++;

        let subValues = [];

        if(lengthType === 0) {
            let subLength = getValue(input, index, 15);
            index += 15;

            let targetIndex = index + subLength;

            while(index < targetIndex) {
                let result = parsePacket(input, index);
                index = result.index;
                version += result.version;
                subValues.push(result.value);
            }
        }
        else {
            let subPackets = getValue(input, index, 11);
            index += 11;
            for(let i = 0; i < subPackets; i++) {
                let result = parsePacket(input, index);
                index = result.index;
                version += result.version;
                subValues.push(result.value);
            }
        }

        switch(type) {
            case 0: 
                value = subValues.reduce((a, b) => a + b);
                break;
            case 1:
                value = subValues.reduce((a, b) => a * b, 1);
                break;
            case 2:
                value = Math.min(...subValues);
                break;
            case 3:
                value = Math.max(...subValues);
                break;
            case 5:
                value = subValues[0] > subValues[1] ? 1 : 0;
                break;
            case 6:
                value = subValues[0] < subValues[1] ? 1 : 0;
                break;
            case 7:
                value = subValues[0] === subValues[1] ? 1 : 0;
                break;
        }
    }

    return { version, index, value };
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

    console.log(parsePacket(input, 0).value);
}).catch((err) => {
    console.log(err, err.stack);
});