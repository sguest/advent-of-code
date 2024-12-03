let lib = require('../../lib');

let year = 2023;
let day = 2;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let max = { red: 12, green: 13, blue: 14 };
    let sum = 0;
    for(let line of lines) {
        let gameSplit = line.split(': ');
        let gameId = +(gameSplit[0].split(' ')[1]);
        let pulls = gameSplit[1].split('; ');
        let possible = true;
        for(let pull of pulls) {
            let items = pull.split(', ');
            for(let item of items) {
                let split = item.split(' ');
                let num = +split[0];
                let colour = split[1];
                if(num > max[colour]) {
                    possible = false;
                }
            }
        }
        if(possible) {
            sum += gameId;
        }
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});