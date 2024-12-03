let lib = require('../../lib');
let runner = require('./runner');
let crypto = require('crypto'); 

function md5(data) { 
    return crypto.createHash('md5').update(data).digest('hex'); 
}

lib.getInput(2016, 14).then((input) => {
    let index = 0;

    console.log(runner(() => {
        let value = input + index;

        for(let i = 0; i < 2017; i++) {
            value = md5(value);
        }
        index++;
        return value;
    }));
});