let fs = require('fs');

function getLength(data) {
    let length = 0;
    let index = 0;

    while(index < data.length) {
        let char = data[index];
        if(char === '(') {
            index++;
            let repeatCount = '';
            while(data[index] !== 'x') {
                repeatCount += data[index];
                index++;
            }
            repeatCount = parseInt(repeatCount, 10);
            let repeatTimes = '';
            index++;
            while(data[index] !== ')') {
                repeatTimes += data[index];
                index++;
            }
            index++;
            repeatTimes = parseInt(repeatTimes, 10);
            length += repeatTimes * getLength(data.substring(index, index + repeatCount));
            index += repeatCount;
        }
        else {
            length++;
            index++;
        }
    }

    return length;
}

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();

    console.log(getLength(data));
});