const lib = require('../../lib');
const md5 = require('md5');

let day = 4;
let year = 2015;

lib.getInput(year, day).then((secret) => {
    var index = 1;

    while(true) {
        var result = md5(secret + index);
        if(/^00000/.test(result)) {
            console.log(index);
            break;
        }
        index++;
    }
});
