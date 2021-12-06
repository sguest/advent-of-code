let lib = require('../../lib');

let year = 2021;
let day = 6;

lib.getInput(year, day).then((data) => {
    let fishes = data.split(',').map(x => +x);
    for(let day = 0; day < 80; day++) {
        let length = fishes.length;
        for(let i = 0; i < length; i++) {
            let fish = fishes[i]
            if(fish === 0) {
                fishes[i] = 6;
                fishes.push(8);
            }
            else
            {
                fishes[i] = fish - 1;
            }
        }
    }

    console.log(fishes.length);
}).catch((err) => {
    console.log(err, err.stack);
});