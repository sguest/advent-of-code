let lib = require('../../lib');

let year = 2022;
let day = 6;

lib.getInput(year, day).then((data) => {
    let last = data.split('').slice(0, 4);
    for(let i = 4; i < data.length; i++) {
        let found = false;
        for(let j = 0; j < 4; j++) {
            for(let k = j + 1; k < 4; k++) {
                if(last[j] === last[k]) {
                    found = true;
                }
            }
        }
        if(!found) {
            console.log(i);
            break;
        }
        last.push(data[i]);
        last.shift();
    }
}).catch((err) => {
    console.log(err, err.stack);
});