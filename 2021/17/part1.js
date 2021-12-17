let lib = require('../../lib');

let year = 2021;
let day = 17;

lib.getInput(year, day).then((data) => {
    let parsed = /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(data);
    let targetXMin = +parsed[1];
    let targetXMax = +parsed[2];
    let targetYMin = +parsed[3];
    let targetYMax = +parsed[4];

    let bestY = 0;

    for(let xLaunch = 0; xLaunch <= targetXMax; xLaunch++) {
        for(let yLaunch = 0; yLaunch <= -targetYMin; yLaunch++) {
            let maxY = 0;
            let currentY = 0;
            let currentX = 0;

            let xSpeed = xLaunch;
            let ySpeed = yLaunch;

            let done = false;

            while(!done) {
                currentY += ySpeed;
                currentX += xSpeed;
                maxY = Math.max(maxY, currentY);
                if(xSpeed > 0) {
                    xSpeed--;
                }
                ySpeed--;

                if(currentX >= targetXMin && currentX <= targetXMax && currentY >= targetYMin && currentY <= targetYMax) {
                    bestY = Math.max(maxY, bestY);
                    done = true;
                }
                else if(currentX > targetXMax || currentY < targetYMin) {
                    done = true;
                }
            }
        }
    }

    console.log(bestY);
}).catch((err) => {
    console.log(err, err.stack);
});