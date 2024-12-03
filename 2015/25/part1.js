let lib = require('../../lib');

let year = 2015;
let day = 25;

lib.getInput(year, day).then((data) => {
    let row = parseInt(/row (\d+)/.exec(data)[1], 10);
    let column = parseInt(/column (\d+)/.exec(data)[1], 10);
    
    let currentCode = 20151125;
    let currentX = 1;
    let currentY = 1;
    
    while(currentX !== column || currentY !== row) {
        currentX++;
        currentY--;
        
        if(currentY === 0) {
            currentY = currentX;
            currentX = 1;
        }
        
        currentCode = (currentCode * 252533) % 33554393;

    }
    console.log(currentCode);
}).catch((err) => {
    console.log(err.stack);
});