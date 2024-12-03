let lib = require('../../lib');

let year = 2021;
let day = 17;

lib.getInput(year, day).then((data) => {
    let parsed = /target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/.exec(data);
    let targetXMin = +parsed[1];
    let targetXMax = +parsed[2];
    let targetYMin = +parsed[3];
    let targetYMax = +parsed[4];

    let matches = 0;

    for(let xLaunch = 0; xLaunch <= targetXMax; xLaunch++) {
        for(let yLaunch = targetYMin; yLaunch <= -targetYMin; yLaunch++) {
            let currentY = 0;
            let currentX = 0;

            let xSpeed = xLaunch;
            let ySpeed = yLaunch;

            let done = false;

            while(!done) {
                currentY += ySpeed;
                currentX += xSpeed;
                if(xSpeed > 0) {
                    xSpeed--;
                }
                ySpeed--;

                if(currentX >= targetXMin && currentX <= targetXMax && currentY >= targetYMin && currentY <= targetYMax) {
                    matches++;
                    done = true;
                }
                else if(currentX > targetXMax || currentY < targetYMin) {
                    done = true;
                }
            }
        }
    }

    console.log(matches);
}).catch((err) => {
    console.log(err, err.stack);
});