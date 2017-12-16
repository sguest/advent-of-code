let lib = require('../../lib');

let year = 2017;
let day = 16;

lib.getInput(year, day).then((data) => {
    let moves = data.split(',');
    let programs = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    for(let move of moves) {
        let instruction = move[0];
        move = move.substring(1);
        let parts;
        let pos1;
        let pos2;
        let temp;

        switch(instruction) {
            case 's':
                let distance = parseInt(move, 10);
                programs.unshift(...programs.splice(programs.length - distance));
                break;
            case 'x' :
                parts = move.split('/');
                pos1 = parseInt(parts[0], 10);
                pos2 = parseInt(parts[1], 10);
                temp = programs[pos1];
                programs[pos1]  = programs[pos2];
                programs[pos2] = temp;
                break;
            case 'p':
                parts = move.split('/');
                pos1 = programs.indexOf(parts[0])
                pos2 = programs.indexOf(parts[1])
                temp = programs[pos1];
                programs[pos1]  = programs[pos2];
                programs[pos2] = temp;
                break;
        }
    }

    console.log(programs);
});