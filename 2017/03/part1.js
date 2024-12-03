const lib = require('../../lib');

lib.getInput(2017, 3).then((data) => {
    let input = +data;

    let x = 0;
    let y = 0;

    let maxX = 0;
    let maxY = 0;
    let minX = 0;
    let minY = 0;

    let direction = 'R';

    let index = 1;

    while(index < input) {
        if(direction === 'R') {
            x += 1;
            if(x > maxX) {
                maxX = x;
                direction = 'U';
            }
        }
        else if(direction === 'L') {
            x -= 1;
            if(x < minX) {
                minX = x;
                direction = 'D';
            }
        }
        else if(direction === 'U')
        {
            y -= 1;
            if(y < minY) {
                minY = y;
                direction = 'L';
            }
        }
        else if(direction === 'D') {
            y += 1;
            if(y > maxY) {
                maxY = y;
                direction = 'R';
            }
        }
        index++;
    }

    console.log(Math.abs(x) + Math.abs(y));
});