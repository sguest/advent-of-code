let lib = require('../../lib');

let year = 2020;
let day = 12;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let x = 0;
    let y = 0;
    let facing = 0;

    let facings = {
        0: 'E',
        90: 'N',
        180: 'W',
        270: 'S',
    }

    for(let line of lines) {
        let action = line[0];
        let value = +(line.substring(1));
        switch(action) {
            case 'N':
                y -=value;
                break;
            case 'S' :
                y += value;
                break;
            case 'E' :
                x += value;
                break;
            case 'W' :
                x -= value;
                break;
            case 'L' :
                facing = (facing + value) % 360;
                break;
            case 'R' :
                facing = (facing - value + 360) % 360
                break;
            case 'F' :
                switch(facings[facing]) {
                    case 'N':
                        y -=value;
                        break;
                    case 'S' :
                        y += value;
                        break;
                    case 'E' :
                        x += value;
                        break;
                    case 'W' :
                        x -= value;
                        break;
                }
                break;
        }
    }

    console.log(Math.abs(x) + Math.abs(y));
}).catch((err) => {
    console.log(err, err.stack);
});