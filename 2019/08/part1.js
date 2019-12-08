let lib = require('../../lib');

let year = 2019;
let day = 8;

lib.getInput(year, day).then((data) => {
    let width = 25;
    let height = 6;

    let layers = [];
    let layerSize = width * height;

    for(let index in data) {
        let num = +data[index];
        let layer = Math.floor(index / layerSize);

        layers[layer] = layers[layer] || [];

        layers[layer][num] = (layers[layer][num] || 0) + 1;
    }

    let minZeroes = Infinity;
    let score = 0;

    for(let layer of layers) {
        if(layer[0] < minZeroes) {
            minZeroes = layer[0];
            score = layer[1] * layer[2];
        }
    }

    console.log(score);
}).catch((err) => {
    console.log(err, err.stack);
});