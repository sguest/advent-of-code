let fs = require('fs');
let path = require('path');

module.exports = function parse(data) {
    let file = fs.readFileSync(path.resolve(__dirname, 'letters.txt'), 'utf-8');
    let letterLines = file.replace(/\r\n/g, '\n').split('\n');

    let letterData = {};
    while(letterLines.length) {
        let char = letterLines.shift();
        let d = [];
        for(let y = 0; y < 6; y++) {
            let line = letterLines.shift();
            d.push([].map.call(line, (c) => c === '#'));
        }
        letterData[char] = d;
    }

    let numLetters = Math.floor(data.length / 5);
    let height = 6;
    let output = '';

    for(let letterIndex = 0; letterIndex < numLetters; letterIndex++) {
        letterLoop: for(let letter in letterData) {
            let currentData = letterData[letter];
            for(let y = 0; y < height; y++) {
                for(let x = 0; x < 5; x++) {
                    let dataX = x + letterIndex * 5;

                    if(data[dataX][y] !== currentData[y][x]) {
                        continue letterLoop;
                    }
                }
            }

            output += letter;
            break;
        }

        if(output.length <= letterIndex) {
            console.log('Failed to parse letter');
            output += '?';
            for(let y = 0; y < height; y++) {
                let line = '';
                for(let x = 0; x < 5; x++) {
                    let dataX = x + letterIndex * 5;
                    line += data[dataX][y] ? '#' : '.';
                }
                console.log(line);
            }
        }
    }

    return output;
}