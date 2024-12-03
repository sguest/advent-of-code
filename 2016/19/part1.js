const lib = require('../../lib');

lib.getInput(2016, 19).then((data) => {
    let input = +data;
    let elves = [];

    for(let index = 0; index < input; index++) {
        elves.push(true);
    }

    let remainingElves = input;
    let target = 0;

    while(remainingElves > 1) {
        target = (target + 1) % input;
        
        while(!elves[target]) {
            target = (target + 1) % input;
        }
        elves[target] = false;
        remainingElves--;
        while(!elves[target]) {
            target = (target + 1) % input;
        }
    }

    for(let index = 0; index < elves.length; index++) {
        if(elves[index]) {
            console.log(index + 1);
            break;
        }
    }
});