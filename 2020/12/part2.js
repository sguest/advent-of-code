let lib = require('../../lib');

let year = 2020;
let day = 12;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let x = 0;
    let y = 0;
    let wayX = 10;
    let wayY = -1;

    for(let line of lines) {
        let action = line[0];
        let value = +(line.substring(1));
        let temp;
        switch(action) {
            case 'N':
                wayY -=value;
                break;
            case 'S' :
                wayY += value;
                break;
            case 'E' :
                wayX += value;
                break;
            case 'W' :
                wayX -= value;
                break;
            case 'L' :
                for(let i = 0; i < value; i += 90) {
                    temp = wayX;
                    wayX = wayY;
                    wayY = -temp;
                }
                break;
            case 'R' :
                for(let i = 0; i < value; i += 90) {
                    temp = wayX;
                    wayX = -wayY;
                    wayY = temp;
                }
                break;
            case 'F' :
                x += wayX * value;
                y += wayY * value;
                break;
        }
    }

    console.log(Math.abs(x) + Math.abs(y));
}).catch((err) => {
    console.log(err, err.stack);
});