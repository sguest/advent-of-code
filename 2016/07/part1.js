const lib = require('../../lib');

lib.getInput(2016, 7).then((data) => {
    let count = 0;
    main:
    for(let line of data.split('\n')) {
        let inBrackets = false;
        let found = false;
        for(let index = 0; index < line.length; index++) {
            if(line[index] === '[') {
                inBrackets = true;
            }
            else if(line[index] === ']') {
                inBrackets = false;
            }
            else if(line[index + 3] === line[index] && line[index + 1] === line[index + 2] && line[index + 1] !== line[index]) {
                if(inBrackets) {
                    continue main;
                }
                found = true;
            }
        }
        if(found) {
            count++;
        }
    }
    console.log(count);
});