let lib = require('../../lib');

let year = {{year}};
let day = {{day}};

lib.getInput(year, day).then((data) => {
    for(let line of data.split('\n')) {
        
    }      
}).catch((err) => {
    console.log(err.stack);
});