let fs = require('fs');
let path = require('path');
let lib = require('../../lib');

let year = 2019;
let day = 8;

lib.getInput(year, day).then((data) => {
    let width = 25;
    let height = 6;

    let imageData = [];
    let layerSize = width * height;

    let numLayers = data.length / layerSize;
    let index = 0;

    for(let layer = 0; layer < numLayers; layer++) {
        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                imageData[x] = imageData[x] || [];
                let num = +data[index];
                if(imageData[x][y] === undefined && num !== 2) {
                    imageData[x][y] = num;
                }
                index++;
            }
        }
    }

    let file = fs.readFileSync(path.resolve(__dirname, 'letters.txt'), 'utf-8');
    let letterLines = file.trim().replace(/\r\n/g, '\n').split('\n');

    let letterData = {};
    while(letterLines.length) {
        let char = letterLines.shift();
        let d = [];
        for(let y = 0; y < 6; y++) {
            let line = letterLines.shift();
            d.push([].map.call(line, (c) => c === '#' ? 1 : 0));
        }
        letterData[char] = d;
    }

    let numLetters = width / 5;
    let output = '';

    for(let letterIndex = 0; letterIndex < numLetters; letterIndex++) {
        letterLoop: for(let letter in letterData) {
            let currentData = letterData[letter];
            for(let y = 0; y < height; y++) {
                for(let x = 0; x < 5; x++) {
                    let dataX = x + letterIndex * 5;

                    if(imageData[dataX][y] !== currentData[y][x]) {
                        continue letterLoop;
                    }
                }
            }

            output += letter;
            break;
        }
    }

    console.log(output);
}).catch((err) => {
    console.log(err, err.stack);
});