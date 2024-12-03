let lib = require('../../lib');
let parseLetters = require('../lib/parseLetters');

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

    imageData = imageData.map(row => row.map(x => x === 1));

    console.log(parseLetters(imageData));
}).catch((err) => {
    console.log(err, err.stack);
});