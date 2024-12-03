let lib = require('../../lib');

let year = {{year}};
let day = {{day}};

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    for(let line of lines) {
        
    }
}).catch((err) => {
    console.log(err, err.stack);
});