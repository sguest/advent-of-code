let lib = require('../../lib');

let year = 2015;
let day = 12;

function getValue(obj){
    let total = 0;
    let isArray = Array.isArray(obj);

    if(typeof obj === 'object') {        
        for(let key in obj) {
            let value = obj[key];
            if(value === 'red' && !isArray) {
                return 0;
            }
            else if(typeof value === 'object') {
                total += getValue(value);                
            }
            else {
                total += parseInt(value) || 0;
            }
        }
    }
    else {
        total += parseInt(obj, 10);
    }

    return total;
}

lib.getInput(year, day).then((data) => {
    var obj = JSON.parse(data);

    console.log(getValue(obj));
});