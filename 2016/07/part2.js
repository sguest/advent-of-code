const lib = require('../../lib');

lib.getInput(2016, 7).then((data) => {
    let count = 0;
    main:
    for(let line of data.split('\n')) {
        let inBrackets = false;
        let foundAba = {};
        let foundBab = {};
        for(let index = 0; index < line.length; index++) {
            if(line[index] === '[') {
                inBrackets = true;
            }
            else if(line[index] === ']') {
                inBrackets = false;
            }
            else if(line[index + 2] === line[index] && line[index + 1] !== line[index]) {
                if(inBrackets) {
                    foundBab[line[index + 1] + line[index]] = true;
                }
                else {
                    foundAba[line[index] + line[index + 1]] = true;
                }
            }
        }
        for(let aba in foundAba) {
            if(foundBab[aba]) {
                count++;
                continue main;
            }
        }
    }
    console.log(count);
});