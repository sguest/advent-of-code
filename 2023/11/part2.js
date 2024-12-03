let lib = require('../../lib');

let year = 2023;
let day = 11;

lib.getInput(year, day).then((data) => {
    let factor = 1000000;
    let lines = data.split('\n');
    let galaxies = [];
    let yDiff = 0;
    for(let y = 0; y < lines.length; y++) {
        let line = lines[y];
        if(!line.split('').some(s => s === '#')) {
            yDiff += factor - 1;
        }
        else {
            for(let x = 0; x < line.length; x++) {
                if(line[x] === '#') {
                    galaxies.push({ x, y: y + yDiff});
                }
            }
        }
    }

    galaxies.sort((a, b) => a.x - b.x);

    let lastX = -1;
    let xDiff = 0;

    for(let galaxy of galaxies) {
        if(galaxy.x > lastX) {
            xDiff += (galaxy.x - lastX - 1) * (factor - 1);
        }
        lastX = galaxy.x;
        galaxy.x += xDiff;
    }

    let sum = 0;
    for(let i = 0; i < galaxies.length; i++) {
        for(let j = i + 1; j < galaxies.length; j++) {
            sum += Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y);
        }
    }

    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});