let lib = require('../../lib');

let year = 2015;
let day = 12;

lib.getInput(year, day).then((data) => {
    let parse = /-?\d+/g;
    let result = parse.exec(data);
    let total = 0;

    while(result) {
        total += parseInt(result, 10);
        result = parse.exec(data);
    }

    console.log(total);
});